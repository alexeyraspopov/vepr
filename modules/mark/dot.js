import { extent } from "../scale/array.js";
import { normalizeOf } from "../variable.js";
import * as shape from "../shape.js";

/** Dots */
export function* dot(data, process) {
  let vectors = process(data);
  let variables = yield {
    x: { type: "numeral", domain: extent(vectors.x) },
    y: { type: "numeral", domain: extent(vectors.y) },
  };
  let x = normalizeOf(variables.x);
  let y = normalizeOf(variables.y);
  let subset = vectors.index.filter((index) => vectors.bitset[index >> 5] & (0x80000000 >>> index));
  // QUESTION how can I optimize x/y channels while keeping pointers in tact
  // or should I apply filter on render? can the filter state be altered via controls?
  return shape
    .dot(subset, {
      x: (p) => x(vectors.x[p]),
      y: (p) => y(vectors.y[p]),
      r: () => 3,
    })
    .snapshot();
}
