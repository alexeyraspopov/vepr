import { scaleQuantile } from "./d3-scale";
import { schemeBlues, interpolateReds, schemeReds } from "./d3-scale-chromatic";
import {
  interpolateDiscrete,
  normalizeQuantile,
  normalizeLinear,
  normalizeQuantize,
} from "../modules/scale/function";

export function drawComparison(container: HTMLElement) {
  let data = [
    11002, 29017, 45793, 7000, 120040, 30138, 21699, 47058, 24001, 6000, 69007, 40000, 55001, 30001,
    61150, 12000, 85530, 83000, 23100, 96225, 45003, 34300, 43000, 63131, 52001, 36000, 10001,
    225786, 0, 75000, 195100, 33010, 5000, 31213, 79050, 40010, 37002, 50000, 60000, 66529, 39048,
    27276, 28007, 153420, 44500, 145443, 89550, 16024, 50, 25001, 300577, 102035, 20581, 170240,
    126101, 18001, 15000, 4000, 0, 100003, 35000, 14001, 72046, 30000, 0, 65006, 56000, 42000,
    17158, 135096, 70040, 114068, 22216, 60020, 2742, 35030, 25000, 76005, 40600, 48335, 58000, 900,
    8000, 19002, 92000, 13000, 50008, 20000, 15100, 108023, 50600, 26483, 38002, 53440, 32007,
    25654, 80130, 20000, 9500, 1968,
  ];

  let extent = [0, data.reduce((a, b) => Math.max(a, b), 0)] as const;

  {
    container.append(
      text("Use linear normalization of data extent and linear interpolation for color scale."),
    );
    container.append(
      code(`
        let n = normalizeLinear(...d3.extent(data));
        let i = d3.interpolateReds;
        let scale = (x) => i(n(x));
      `),
    );
    let n = normalizeLinear(...extent);
    let i = interpolateReds;
    container.append(createPalete(n, i, data));
  }

  {
    container.append(text("The same linear interpolation but mapped for sorted data."));
    let vs = data.slice().sort((a, b) => a - b);
    let n = normalizeLinear(...extent);
    let i = interpolateReds;
    container.append(createPalete(n, i, vs));
  }

  {
    container.append(text("Use quantize normalization with 3 color groups."));
    container.append(
      code(`
        let n = normalizeQuantize(...d3.extent(data));
        let i = interpolateDiscrete(["color 1", "color 2", "color 3"]);
        let scale = (x) => i(n(x));
      `),
    );
    let n = normalizeQuantize(...extent);
    let i = interpolateDiscrete(schemeReds[4].slice(0, -1));
    container.append(createPalete(n, i, data));
  }

  {
    container.append(text(`Use quantile normalization with 3 color groups.`));
    container.append(
      code(`
        let n = normalizeQuantile(data);
        let i = interpolateDiscrete(["color 1", "color 2", "color 3"]);
        let scale = (x) => i(n(x));
      `),
    );
    let n = normalizeQuantile(data);
    let i = interpolateDiscrete(schemeReds[4].slice(0, -1));
    container.append(createPalete(n, i, data));
  }

  {
    container.append(text(`Sort data with the same quantile normalization.`));
    let vs = data.slice().sort((a, b) => a - b);
    let n = normalizeQuantile(vs);
    // TODO how do I get distinct quantiles that I can use for legend? (as in showing ranges)
    let i = interpolateDiscrete(schemeReds[4].slice(0, -1));
    container.append(createPalete(n, i, vs));
  }
}

function createPalete(n: any, i: any, vs: any[]) {
  let container = document.createElement("section");

  for (let j = 0; j < vs.length; j++) {
    let block = document.createElement("div");
    block.style.background = i(n(vs[j]));
    container.append(block);
  }

  return container;
}

function text(content: string) {
  let p = document.createElement("p");
  p.append(document.createTextNode(content));
  return p;
}

function code(content: string) {
  let p = document.createElement("pre");
  let lines = content.split(/\n/);
  let length = lines.reduce((length, line) => {
    let m = line.match(/^(\s+)\S+/);
    if (m == null) return length;
    return Math.min(m[1].length, length);
  }, Infinity);
  for (let line of lines) {
    if (line.trim().length === 0) continue;
    let c = document.createElement("code");
    c.append(document.createTextNode(line.slice(length)));
    p.append(c);
    p.append(document.createTextNode("\n"));
  }
  return p;
}
