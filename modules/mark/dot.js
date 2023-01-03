import { extent } from "../scale/array.js";
import { Linear } from "../scale/scale.js";

/**
 * Dots
 *
 * @returns {Mark}
 */
export function dot(data, process) {
  function variables() {
    let vectors = process(data, { x: "", y: "" });
    let variables = {
      x: { type: "q", domain: extent(vectors.x) },
      y: { type: "q", domain: extent(vectors.y) },
    };
    return [vectors, variables];
  }

  return { variables, channels };
}

function channels(vectors, variables) {
  let ScaleX = variables.x.type === "q" ? Linear : null;
  let ScaleY = variables.y.type === "q" ? Linear : null;
  let x = ScaleX(variables.x.domain, [0, 2 ** 16]);
  let y = ScaleY(variables.y.domain, [2 ** 16, 0]);
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
