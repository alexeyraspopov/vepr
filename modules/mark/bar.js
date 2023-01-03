import { extent } from "../scale/array.js";
import { Linear, Band } from "../scale/scale.js";

/**
 * Horizontal bars. Ordinal Y scale, Quantitive X scale
 *
 * @returns {Mark}
 */
export function barX(data, process) {
  function variables() {
    let vectors = process(data, { x: "", y: "" });
    let variables = {
      x: { type: "q", domain: extent(vectors.x) },
      y: { type: "o", domain: Array.from(new Set(vectors.y)) },
    };
    return [vectors, variables];
  }

  function channels(vectors, variables) {
    let y = Band(variables.y.domain, [2 ** 16, 0], 0.1, 0.1);
    let x = Linear(variables.x.domain, [0, 2 ** 16]);
    let subset = vectors.index.filter(
      (index) => vectors.bitset[index >> 5] & (0x80000000 >>> index),
    );
    return {
      key: "bar",
      channels: {
        index: subset,
        x: Float64Array.from(vectors.index, (index) => x(vectors.x[index])),
        y: Float64Array.from(vectors.index, (index) => y(vectors.y[index])),
        fill: [],
        band: y.bandwidth(),
        flow: "x",
      },
    };
  }

  return { variables, channels };
}

/**
 * Vertical series of bars. Quantitive Y scale, Ordinal X scale
 *
 * @returns {Mark}
 */
export function barY(data, process) {
  function variables() {
    let vectors = process(data, { x: "", y: "" });
    let variables = {
      x: { type: "o", domain: Array.from(new Set(vectors.x)) },
      y: { type: "q", domain: extent(vectors.y) },
    };
    return [vectors, variables];
  }

  function channels(vectors, variables) {
    let x = Band(variables.x.domain, [0, 2 ** 16], 0.1, 0.1);
    let y = Linear(variables.y.domain, [2 ** 16, 0]);
    let subset = vectors.index.filter(
      (index) => vectors.bitset[index >> 5] & (0x80000000 >>> index),
    );
    return {
      key: "bar",
      channels: {
        index: subset,
        x: Float64Array.from(vectors.index, (index) => x(vectors.x[index])),
        y: Float64Array.from(vectors.index, (index) => y(vectors.y[index])),
        fill: [], // can be cont or ord
        band: x.bandwidth(),
        flow: "y",
      },
    };
  }

  return { variables, channels };
}

/** @param {CanvasRenderingContext2D} context */
export function renderBar(context, scales, channels) {
  let constant = (v) => (_) => v;
  let x = ArrayBuffer.isView(channels.x) ? (p) => scales.x(channels.x[p]) : constant(channels.x);
  let y = ArrayBuffer.isView(channels.y) ? (p) => scales.y(channels.y[p]) : constant(channels.y);
  if (channels.flow === "y") {
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
