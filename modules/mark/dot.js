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
    shapes: [
      {
        tag: "circle",
        attrs: {
          cx: "x(d.x)",
          cy: "y(d.y)",
          r: "2",
          stroke: "'currentColor'",
          fill: "'transparent'",
        },
      },
    ],
    channels: {
      index: Uint16Array.from(data, (_, index) => index),
      x: Float32Array.from(encodings.values(data, encodings.x), h),
      y: Float32Array.from(encodings.values(data, encodings.y), v),
    },
  };
}
