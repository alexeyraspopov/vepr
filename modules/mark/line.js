import { extent } from "../scale/array.js";
import { normalizeOf } from "../variable.js";
import * as shape from "../shape.js";

export function* line(data, process) {
  let vectors = process(data);
  let variables = yield {
    x: { type: "numeral", domain: extent(vectors.x) },
    y: { type: "numeral", domain: extent(vectors.y) },
  };
  let x = normalizeOf(variables.x);
  let y = normalizeOf(variables.y);
  let subset = vectors.index.filter((index) => vectors.bitset[index >> 5] & (0x80000000 >>> index));
  let { line } = shape;
  return line(subset, {
    x: (index) => x(vectors.x[index]),
    y: (index) => y(vectors.y[index]),
  }).snapshot();
}
