import { extent } from "../scale/array.js";

// transformer should return a set of methods to pull data as it gets used in encodings
export function identity(encodings) {
  return {
    domain(data, key) {
      return extent(data, (datum) => datum[key]);
    },
    ...encodings,
    vectors: {
      x: { domain: null, values: null },
    },
    *values(data, key) {
      for (let datum of data) yield datum[key];
    },
  };
}
