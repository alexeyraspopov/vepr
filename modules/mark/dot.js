import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";

export function dot(data, encodings) {
  let h = scaleLinear(
    extent(data, (datum) => datum[encodings.x]),
    [0, 2 ** 16],
  );
  let v = scaleLinear(
    extent(data, (datum) => datum[encodings.y]),
    [2 ** 16, 0],
  );
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
