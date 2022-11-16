/**
 * Compute an array of indices of values sorted in ascending order
 * @template T
 * @param {Array<T>} values
 * @param {(value: T) => any} [valueOf]
 */
export function rank(values, valueOf = identity) {
  return Uint32Array.from(values, (_, i) => i).sort((iA, iB) => {
    let a = valueOf(values[iA]);
    if (a === null) return 1;
    let b = valueOf(values[iB]);
    if (b === null) return -1;
    return a === b ? 0 : a < b ? -1 : a > b ? 1 : isNaN(a) ? 1 : isNaN(b) ? -1 : 0;
  });
}

/**
 * @template T
 * @param {Array<T>} values
 * @param {T} x
 */
export function bisect(values, x, lo = 0, hi = values.length - 1) {
  while (lo <= hi) {
    let mid = (lo + hi) >>> 1;
    if (values[mid] <= x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/**
 * @template T
 * @param {Array<T>} values
 * @param {(value: T) => any} [valueOf]
 */
export function extent(values, valueOf = identity) {
  if (values.length === 0) return [undefined, undefined];
  let min = valueOf(values[0]);
  let max = min;
  for (let index = 0; index < values.length; index++) {
    let value = valueOf(values[index]);
    if (value < min) min = value;
    if (value > max) max = value;
  }
  return [min, max];
}

/**
 * @template T
 * @param {T} value
 * @return {T}
 */
function identity(value) {
  return value;
}

// https://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population
export function quantileSorted(values, p, valueOf = (v, i, a) => v) {
  var n = values.length;
  if (p <= 0 || n < 2) return +valueOf(values[0], 0, values);
  if (p >= 1) return +valueOf(values[n - 1], n - 1, values);
  let i = (n - 1) * p;
  let i0 = Math.floor(i);
  let value0 = +valueOf(values[i0], i0, values);
  let value1 = +valueOf(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
}

let e10 = Math.sqrt(50);
let e5 = Math.sqrt(10);
let e2 = Math.sqrt(2);

export function linticks(start, stop, count) {
  // allow descending ticks generation
  let reverse = start > stop;
  let [lo, hi] = reverse ? [stop, start] : [start, stop];
  // delta is enough to generate evenly spaced intervals but not enough for human-readable
  let delta = (hi - lo) / count;
  // selecting 10 as a base for generating nice intervals
  let power = Math.floor(Math.log10(delta));
  // this will give up IEEE 754 weirdness
  let error = delta / 10 ** power;
  // floor to closest desired interval (10 | 5 | 2 | 1)
  let approx = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  // calculate tick step that can be used in further calc
  let step = 10 ** -power / approx;
  // get starting and ending point that include required values in the scale
  let x0 = Math.floor(lo * step);
  let x1 = Math.ceil(hi * step);
  let result = Array.from({ length: x1 - x0 + 1 }, (_, i) => (x0 + i) / step);
  return reverse ? result.reverse() : result;
}

/**
 * A comparator that ensures ascending order and handles nulls and NaNs.
 * Resulting order is [x0, x1, x2, x3, x..., NaN..., null..., undefined...]
 */
export function ascending(a, b) {
  // prettier-ignore
  return a === b ? 0 : a === null ? 1 : b === null ? -1 : a < b ? -1 : a > b ? 1 : isNaN(a) ? 1 : isNaN(b) ? -1 : 0;
}

/**
 * A comparator that ensures descending order and handles nulls and NaNs.
 * Resulting order is [x4, x3, x2, x1, x..., NaN..., null..., undefined...]
 */
export function descending(a, b) {
  // prettier-ignore
  return a === b ? 0 : a === null ? 1 : b === null ? -1 : a < b ? 1 : a > b ? -1 : isNaN(a) ? 1 : isNaN(b) ? -1 : 0;
}
