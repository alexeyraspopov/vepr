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
  return function identity(data, defaults) {
    let index = Uint32Array.from(data, (_, i) => i);
    let bitset = Uint32Array.from({ length: Math.ceil(data.length / 32) });
    if ("filter" in options) {
      index.forEach((index) => {
        if (options.filter(data[index], index)) {
          bitset[index >> 5] |= 0x80000000 >>> index;
        }
      });
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
