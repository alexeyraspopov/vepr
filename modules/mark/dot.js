import { extent } from "../scale/array.js";
import { Linear } from "../scale/scale.js";

/**
 * Dots
 *
 * @returns {Mark}
 */
export function dot(data, encodings) {
  let hdomain = extent(data, (datum) => datum[encodings.x]);
  let h = Linear(hdomain, [0, 2 ** 16]);
  let vdomain = extent(data, (datum) => datum[encodings.y]);
  let v = Linear(vdomain, [2 ** 16, 0]);
  return {
    key: "dot",
    channels: {
      index: Uint32Array.from(data, (_, index) => index),
      x: Float32Array.from(encodings.values(data, encodings.x), h),
      y: Float32Array.from(encodings.values(data, encodings.y), v),
      r: 3,
    },
  };
}

/** @param {CanvasRenderingContext2D} context */
export function renderDot(context, scales, channels) {
  let constant = (v) => (_) => v;
  let x = ArrayBuffer.isView(channels.x) ? (p) => scales.x(channels.x[p]) : constant(channels.x);
  let y = ArrayBuffer.isView(channels.y) ? (p) => scales.y(channels.y[p]) : constant(channels.y);
  let r = constant(channels.r);

  for (let pointer of channels.index) {
    context.beginPath();
    context.arc(x(pointer), y(pointer), r(pointer), 0, 2 * Math.PI, false);
    context.lineWidth = 1.5;
    context.strokeStyle = "currentColor";
    context.stroke();
  }
}
