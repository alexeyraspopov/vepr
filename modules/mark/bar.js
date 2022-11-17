import { Linear, Band } from "../scale/scale.js";

export function barX(data, encodings) {
  let contdomain = encodings.domain.y;
  let cont = Linear(contdomain, [2 ** 16, 0]);
  let orddomain = data.map((datum) => datum[encodings.x]);
  let ord = Band(orddomain, [0, 2 ** 16], 0.1, 0.1);
  return {
    key: "bar",
    shapes: [
      {
        tag: "rect",
        attrs: {
          x: "x(d.x)",
          y: "y(d.y)",
          width: `x(${ord.bandwidth()})`,
          height: "y(2 ** 16 - d.y)",
          fill: "'currentColor'",
        },
      },
    ],
    channels: {
      index: Uint16Array.from(data, (_, index) => index),
      x: Float32Array.from(encodings.values(data, encodings.x), ord),
      y: Float32Array.from(encodings.values(data, encodings.y), cont),
      fill: [], // can be cont or ord
    },
  };
}

export function barY(data, encodings) {
  let contdomain = encodings.domain.x;
  let cont = Linear(contdomain, [0, 2 ** 16]);
  let orddomain = data.map((datum) => datum[encodings.y]);
  let ord = Band(orddomain, [2 ** 16, 0], 0.1, 0.1);
  return {
    key: "bar",
    shapes: [
      {
        tag: "rect",
        attrs: {
          x: 0,
          y: "y(d.y)",
          width: `x(d.x)`,
          height: `y(${ord.bandwidth()})`,
          fill: "'currentColor'",
        },
      },
    ],
    channels: {
      index: Uint16Array.from(data, (_, index) => index),
      x: Float32Array.from(encodings.values(data, encodings.x), cont),
      y: Float32Array.from(encodings.values(data, encodings.y), ord),
      fill: [], // can be cont or ord
    },
  };
}
