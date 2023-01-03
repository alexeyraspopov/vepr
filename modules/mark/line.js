import { extent } from "../scale/array.js";
import { Linear } from "../scale/scale.js";

export function line(data, process) {
  function variables() {
    let vectors = process(data, { x: "", y: "" });
    let variables = {
      x: { type: "q", domain: extent(vectors.x) },
      y: { type: "q", domain: extent(vectors.y) },
    };
    return [vectors, variables];
  }

  function channels(vectors, variables) {
    let ScaleX = variables.x.type === "q" ? Linear : null;
    let ScaleY = variables.y.type === "q" ? Linear : null;
    let x = ScaleX(variables.x.domain, [0, 2 ** 16]);
    let y = ScaleY(variables.y.domain, [2 ** 16, 0]);
    let subset = vectors.index.filter(
      (index) => vectors.bitset[index >> 5] & (0x80000000 >>> index),
    );
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

  return { variables, channels };
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
