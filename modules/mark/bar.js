import { extent, unique } from "../scale/array.js";
import { normalizeBand, normalizeLinear } from "../scale/function.js";
import { rect } from "../shape.js";

/** Horizontal bars. Ordinal Y scale, Quantitive X scale */
export function* barX(data, process) {
  let vectors = process(data);
  let variables = yield {
    x: { type: "numeral", domain: extent(vectors.x) },
    y: { type: "ordinal", domain: unique(vectors.y) },
  };
  let y = normalizeBand(variables.y.domain, 0.1, 0.1);
  let x = normalizeLinear(variables.x.domain[0], variables.x.domain[1]);
  let subset = vectors.index.filter((index) => vectors.bitset[index >> 5] & (0x80000000 >>> index));
  return rect(subset, {
    x1: () => 0,
    x2: (index) => x(vectors.x[index]),
    y1: (index) => y(vectors.y[index]),
    y2: (index) => y(vectors.y[index]) + y.width,
  }).snapshot();
}

/** Vertical series of bars. Quantitive Y scale, Ordinal X scale */
export function* barY(data, process) {
  let vectors = process(data);
  let variables = yield {
    x: { type: "ordinal", domain: Array.from(new Set(vectors.x)) },
    y: { type: "numeral", domain: extent(vectors.y) },
  };
  let x = normalizeBand(variables.x.domain, 0.1, 0.1);
  let y = normalizeLinear(variables.y.domain[0], variables.y.domain[1]);
  let subset = vectors.index.filter((index) => vectors.bitset[index >> 5] & (0x80000000 >>> index));
  return rect(subset, {
    x1: (index) => x(vectors.x[index]),
    x2: (index) => x(vectors.x[index]) + x.width,
    y1: (index) => y(vectors.y[index]),
    y2: () => 0,
  }).snapshot();
}
