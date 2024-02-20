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
