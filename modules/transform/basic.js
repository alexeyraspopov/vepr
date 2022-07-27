import { extent } from "d3-array";

export function basic(encodings) {
  return {
    ...encodings,
    vectors: {
      x: { domain: null, values: null },
    },
    *values(data, key) {
      for (let datum of data) yield datum[key];
    },
  };
}
