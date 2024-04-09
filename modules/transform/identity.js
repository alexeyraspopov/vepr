/**
 * @template T
 * @typedef TransformOptions
 * @property {(value: T, index: number) => boolean} [filter]
 * @property {(a: T, b: T) => -1 | 0 | 1} [sort]
 * @property {boolean} [reverse]
 */

/**
 * @template T
 * @template [K]
 * @param {Record<K, string>} encodings
 * @param {TransformOptions<T>} [options]
 */
export function identity(encodings, options = {}) {
  /**
   * @param {T[]} data
   * @param {Record<K, string>} defaults
   */
  return function identity(data, defaults = {}) {
    let index = Uint32Array.from(data, (_, i) => i);
    let bitset = Uint32Array.from({ length: Math.ceil(data.length / 32) });
    if ("filter" in options) {
      for (let i = 0; i < index.length; i++) {
        let v = index[i];
        if (options.filter(data[v], v)) {
          bitset[v >> 5] |= 0x80000000 >>> v;
        }
      }
    } else {
      bitset.fill(0xffffffff);
    }
    if ("sort" in options) {
      index.sort((iA, iB) => options.sort(data[iA], data[iB]));
    }
    if ("reverse" in options) {
      if (options.reverse) index.reverse();
    }
    let combined = Object.assign({}, defaults, encodings);
    return Object.assign(
      Object.fromEntries(
        Object.keys(combined).map((key) => {
          return [key, Array.from(index, (index) => data[index][encodings[key]])];
        }),
      ),
      { index, bitset },
    );
  };
}
