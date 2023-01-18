import { extent } from "../scale/array.js";
import { NormalizeBand, NormalizeRange } from "../scale/number.js";

/** Horizontal bars. Ordinal Y scale, Quantitive X scale */
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
      x1: 0,
      x2: Float64Array.from(vectors.index, (index) => x(vectors.x[index])),
      y1: Float64Array.from(vectors.index, (index) => y(vectors.y[index])),
      y2: Float64Array.from(vectors.index, (index) => y(vectors.y[index]) + y.bandwidth),
      fill: [],
    },
  };
}

/** Vertical series of bars. Quantitive Y scale, Ordinal X scale */
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
      x1: Float64Array.from(vectors.index, (index) => x(vectors.x[index])),
      x2: Float64Array.from(vectors.index, (index) => x(vectors.x[index]) + x.bandwidth),
      y1: Float64Array.from(vectors.index, (index) => y(vectors.y[index])),
      y2: 0,
      fill: [], // can be cont or ord
    },
  };
}

/** @param {CanvasRenderingContext2D} context */
export function renderBar(context, scales, channels) {
  let x1 = fnify(channels.x1, scales.x);
  let x2 = fnify(channels.x2, scales.x);
  let y1 = fnify(channels.y1, scales.y);
  let y2 = fnify(channels.y2, scales.y);

  for (let pointer of channels.index) {
    context.fillStyle = "currentColor";
    context.fillRect(
      x1(pointer),
      y1(pointer),
      x2(pointer) - x1(pointer),
      y2(pointer) - y1(pointer),
    );
  }
}

function fnify(channel, scale) {
  return ArrayBuffer.isView(channel) ? (p) => scale(channel[p]) : constant(scale(channel));
}

function constant(v) {
  return (_) => v;
}
