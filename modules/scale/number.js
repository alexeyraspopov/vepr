/**
 * @param {number} [exponent=1] Default is `1`
 * @returns {(value: number) => number}
 */
export function pow(exponent = 1) {
  return (x) => (x < 0 ? -((-x) ** exponent) : x ** exponent);
}

/**
 * @param {number} [base=Math.E] Default is `Math.E`
 * @returns {(value: number) => number}
 */
export function log(base = Math.E) {
  if (base === Math.E) return Math.log;
  if (base === 10) return Math.log10;
  if (base === 2) return Math.log2;
  return (base = Math.log(base)), (x) => Math.log(x) / base;
}

/**
 * @param {number} [constant=1] Default is `1`
 * @returns {(value: number) => number}
 */
export function symlog(constant = 1) {
  return (x) => Math.sign(x) * Math.log1p(Math.abs(x / constant));
}

/**
 * @param {[number, number]} extent
 * @returns {(value: number) => number}
 */
export function NormalizeRange([a, b]) {
  let k = b - a;
  return k === 0 ? (_) => 0.5 : (x) => (x - a) / k;
}

/**
 * Normalize [0..N] rank to a binned space
 *
 * @template Domain
 * @param {Domain[]} vs
 * @param {number} [paddingInner=0] Default is `0`
 * @param {number} [paddingOuter=0] Default is `0`
 * @param {number} [align=0.5] Default is `0.5`
 * @returns {((value: Domain) => number) & { bandwidth: number }}
 */
export function NormalizeBand(vs, paddingInner = 0, paddingOuter = 0, align = 0.5) {
  let count = vs.length;
  let step = 1 / Math.max(1, count - paddingInner + paddingOuter * 2);
  let start = (1 - step * (count - paddingInner)) * align;
  let bandwidth = step * (1 - paddingInner);
  return Object.assign((x) => step * vs.indexOf(x) + start, { bandwidth });
}

/**
 * @param {[number, number]} range
 * @returns {(t: number) => number}
 */
export function InterpolateRange(range) {
  let [a, b] = range;
  let k = b - a;
  return k === 0 ? (_) => a : (t) => a + k * t;
}
