import { extent } from "../scale/array.js";
import { NormalizeBand, NormalizeRange } from "../scale/number.js";

/**
 * Horizontal bars. Ordinal Y scale, Quantitive X scale
 *
 * @returns {Mark}
 */
export function* barX(data, process) {
  let vectors = process(data);
  let variables = yield {
    x: { type: "numeral", domain: extent(vectors.x) },
    y: { type: "ordinal", domain: Array.from(new Set(vectors.y)) },
  };
  let y = NormalizeBand(variables.y.domain, 0.1, 0.1);
  let x = NormalizeRange(variables.x.domain);
  let subset = vectors.index.filter((index) => vectors.bitset[index >> 5] & (0x80000000 >>> index));
  return {
    key: "bar",
    channels: {
      index: subset,
      x: Float64Array.from(vectors.index, (index) => x(vectors.x[index])),
      y: Float64Array.from(vectors.index, (index) => y(vectors.y[index])),
      fill: [],
      band: y.bandwidth,
      flow: "x",
    },
  };
}

/**
 * Vertical series of bars. Quantitive Y scale, Ordinal X scale
 *
 * @returns {Mark}
 */
export function* barY(data, process) {
  let vectors = process(data);
  let variables = yield {
    x: { type: "ordinal", domain: Array.from(new Set(vectors.x)) },
    y: { type: "numeral", domain: extent(vectors.y) },
  };
  let x = NormalizeBand(variables.x.domain, 0.1, 0.1);
  let y = NormalizeRange(variables.y.domain);
  let subset = vectors.index.filter((index) => vectors.bitset[index >> 5] & (0x80000000 >>> index));
  return {
    key: "bar",
    channels: {
      index: subset,
      x: Float64Array.from(vectors.index, (index) => x(vectors.x[index])),
      y: Float64Array.from(vectors.index, (index) => y(vectors.y[index])),
      fill: [], // can be cont or ord
      band: x.bandwidth,
      flow: "y",
    },
  };
}

/** @param {CanvasRenderingContext2D} context */
export function renderBar(context, scales, channels) {
  let constant = (v) => (_) => v;
  let x = ArrayBuffer.isView(channels.x) ? (p) => scales.x(channels.x[p]) : constant(channels.x);
  let y = ArrayBuffer.isView(channels.y) ? (p) => scales.y(channels.y[p]) : constant(channels.y);
  if (channels.flow === "y") {
    let size = scales.x(channels.band) - scales.x(0);
    for (let pointer of channels.index) {
      context.fillStyle = "currentColor";
      context.fillRect(x(pointer), y(pointer), size, scales.y(0) - y(pointer));
    }
  } else {
    let size = scales.y(channels.band) - scales.y(0);
    for (let pointer of channels.index) {
      context.fillStyle = "currentColor";
      context.fillRect(scales.x(0), y(pointer), x(pointer) - scales.x(0), size);
    }
  }
}
