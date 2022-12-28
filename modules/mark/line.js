import { extent } from "../scale/array.js";
import { Linear } from "../scale/scale.js";

export function lineX(data, encodings) {
  let hdomain = extent(data, (datum, index) => index);
  let h = Linear(hdomain, [0, 2 ** 16]);
  let vdomain = encodings.domain.y; //extent(data, (datum) => datum[encodings.y]);
  let v = Linear(vdomain, [2 ** 16, 0]);
  return {
    key: "line",
    channels: {
      index: Uint32Array.from(data, (_, index) => index),
      x: Float32Array.from(encodings.values(data, encodings.x), (_, i) => h(i)),
      y: Float32Array.from(encodings.values(data, encodings.y), v),
      w: 1.5,
    },
  };
}

export function lineY(data, encodings) {
  return {
    key: "line",
    channels: {
      index: Uint32Array.from(data, (_, index) => index),
      x: Float32Array.from([]),
      y: Float32Array.from([]),
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
