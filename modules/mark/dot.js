import { extent } from "../scale/array.js";
import { NormalizeBand, NormalizeRange } from "../scale/number.js";

/**
 * Dots
 *
 * @returns {Mark}
 */
export function* dot(data, process) {
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
  // QUESTION how can I optimize x/y channels while keeping pointers in tact
  // or should I apply filter on render? can the filter state be altered via controls?
  return {
    key: "dot",
    channels: {
      index: subset,
      x: Float64Array.from(vectors.index, (index) => x(vectors.x[index])),
      y: Float64Array.from(vectors.index, (index) => y(vectors.y[index])),
      r: 3,
    },
  };
}

/** @param {CanvasRenderingContext2D} context */
export function renderDot(context, scales, channels) {
  let constant = (v) => (_) => v;
  let x = ArrayBuffer.isView(channels.x)
    ? (p) => scales.x(channels.x[p])
    : constant(scales.x(channels.x));
  let y = ArrayBuffer.isView(channels.y)
    ? (p) => scales.y(channels.y[p])
    : constant(scales.y(channels.y));
  let r = constant(channels.r);

  for (let pointer of channels.index) {
    context.beginPath();
    context.arc(x(pointer), y(pointer), r(pointer), 0, 2 * Math.PI, false);
    context.lineWidth = 1.5;
    context.strokeStyle = "currentColor";
    context.stroke();
  }
}
