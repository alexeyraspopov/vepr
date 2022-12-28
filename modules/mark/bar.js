import { Linear, Band } from "../scale/scale.js";

/**
 * Bars
 *
 * @returns {Mark}
 */
export function barX(data, encodings) {
  let contdomain = encodings.domain.y;
  let cont = Linear(contdomain, [2 ** 16, 0]);
  let orddomain = data.map((datum) => datum[encodings.x]);
  let ord = Band(orddomain, [0, 2 ** 16], 0.1, 0.1);
  return {
    key: "bar",
    channels: {
      index: Uint32Array.from(data, (_, index) => index),
      x: Float32Array.from(encodings.values(data, encodings.x), ord),
      y: Float32Array.from(encodings.values(data, encodings.y), cont),
      fill: [], // can be cont or ord
      band: ord.bandwidth(),
      flow: "x",
    },
  };
}

/**
 * Bars
 *
 * @returns {Mark}
 */
export function barY(data, encodings) {
  let contdomain = encodings.domain.x;
  let cont = Linear(contdomain, [0, 2 ** 16]);
  let orddomain = data.map((datum) => datum[encodings.y]);
  let ord = Band(orddomain, [2 ** 16, 0], 0.1, 0.1);
  return {
    key: "bar",
    channels: {
      index: Uint32Array.from(data, (_, index) => index),
      x: Float32Array.from(encodings.values(data, encodings.x), cont),
      y: Float32Array.from(encodings.values(data, encodings.y), ord),
      fill: [], // can be cont or ord
      band: ord.bandwidth(),
      flow: "y",
    },
  };
}

export function renderBar(context, scales, channels) {
  let constant = (v) => (_) => v;
  let x = ArrayBuffer.isView(channels.x) ? (p) => scales.x(channels.x[p]) : constant(channels.x);
  let y = ArrayBuffer.isView(channels.y) ? (p) => scales.y(channels.y[p]) : constant(channels.y);
  if (channels.flow === "x") {
    for (let pointer of channels.index) {
      context.fillStyle = "currentColor";
      context.fillRect(
        x(pointer),
        y(pointer),
        scales.x(channels.band) - scales.x(0),
        scales.y(2 ** 16) - y(pointer),
      );
    }
  } else {
    for (let pointer of channels.index) {
      context.fillStyle = "currentColor";
      context.fillRect(
        scales.x(0),
        y(pointer),
        x(pointer) - scales.x(0),
        scales.y(channels.band) - scales.y(0),
      );
    }
  }
}
