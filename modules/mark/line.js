import { extent } from "../scale/array.js";
import { NormalizeBand, NormalizeRange } from "../scale/number.js";

export function* line(data, process) {
  let vectors = process(data);
  let variables = yield {
    x: { type: "numeral", domain: extent(vectors.x) },
    y: { type: "numeral", domain: extent(vectors.y) },
  };
  let x, y;
  if (variables.x.type === "numeral") {
    x = NormalizeRange(variables.x.domain);
  } else if (variables.x.type === "ordinal") {
    let norm = NormalizeBand(variables.x.domain, 0.1, 0.1);
    x = (v) => norm(v) + norm.bandwidth / 2;
  }
  if (variables.y.type === "numeral") {
    y = NormalizeRange(variables.y.domain);
  } else if (variables.y.type === "ordinal") {
    let norm = NormalizeBand(variables.y.domain, 0.1, 0.1);
    y = (v) => norm(v) + norm.bandwidth / 2;
  }
  let subset = vectors.index.filter((index) => vectors.bitset[index >> 5] & (0x80000000 >>> index));
  return {
    key: "line",
    channels: {
      index: subset,
      x: Float64Array.from(vectors.index, (index) => x(vectors.x[index])),
      y: Float64Array.from(vectors.index, (index) => y(vectors.y[index])),
      w: 1.5,
    },
  };
}

/** @param {CanvasRenderingContext2D} context */
export function renderLine(context, scales, channels) {
  let constant = (v) => (_) => v;
  let x = ArrayBuffer.isView(channels.x) ? (p) => scales.x(channels.x[p]) : constant(channels.x);
  let y = ArrayBuffer.isView(channels.y) ? (p) => scales.y(channels.y[p]) : constant(channels.y);
  let path = new Path2D();

  path.moveTo(x(channels.index[0]), y(channels.index[0]));
  for (let index = 1; index < channels.index.length; index++) {
    let pointer = channels.index[index];
    // TODO needs to do moveto if coords had NaN
    path.lineTo(x(pointer), y(pointer));
  }

  context.beginPath();
  context.lineWidth = channels.w;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.miterLimit = 1;
  context.strokeStyle = "currentColor";
  context.stroke(path);
}
