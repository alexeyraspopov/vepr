/**
 * Compute an array of indices of values sorted in ascending order
 *
 * @template T
 * @template [R=T] Default is `T`
 * @param {T[]} values
 * @param {(value: T, index?: number, values?: T[]) => R} [valueOf=identity] Default is `identity`
 * @returns {Uint32Array}
 */
export function rank(values, valueOf = identity) {
  return Uint32Array.from({ length: values.length }, (_, i) => i).sort((iA, iB) => {
    return ascending(valueOf(values[iA], iA, values), valueOf(values[iB], iB, values));
  });
}

/**
 * Bisect right
 *
 * @template T
 * @param {T[]} values
 * @param {T} x
 */
export function bisect(values, x, lo = 0, hi = values.length) {
  while (lo < hi) {
    let mid = (lo + hi) >>> 1;
    if (ascending(values[mid], x) <= 0) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/**
 * Returns a tuple of [min, max] values of an array. Returns [undefined, undefined] if the target
 * array is empty.
 *
 * @template T
 * @template [R=T] Default is `T`
 * @param {T[]} values
 * @param {(value: T, index?: number, values?: T[]) => R} [valueOf=identity] Default is `identity`
 * @returns {[R, R] | [undefined, undefined]} Tuple of min and max values
 */
export function extent(values, valueOf = identity) {
  if (values.length === 0) return [undefined, undefined];
  let min = valueOf(values[0], 0, values);
  let max = min;
  for (let index = 1, value; index < values.length; index++) {
    value = valueOf(values[index], index, values);
    if (value == null) continue;
    if (value > max) max = value;
    else if (value < min) min = value;
  }
  return [min, max];
}

/**
 * @template T
 * @template [R=T] Default is `T`
 * @param {T[]} values
 * @param {(value: T, index?: number, values?: T[]) => R} [valueOf=identity] Default is `identity`
 * @returns {R[]} Array of unique values
 */
export function unique(values, valueOf) {
  return Array.from(new Set(valids(values, valueOf)));
}

function* valids(values, valueOf) {
  if (valueOf != null) {
    for (let index = 0, value; index < values.length; index++) {
      value = valueOf(values[index], index, values);
      if (value != null && !Number.isNaN(value)) yield value;
    }
  } else {
    for (let index = 0, value; index < values.length; index++) {
      value = values[index];
      if (value != null && !Number.isNaN(value)) yield value;
    }
  }
}

/**
 * Basic reusable function that can often be used as a default value for when mapping is
 * unnecessary.
 *
 * @template T
 * @param {T} value
 * @returns {T}
 */
export function identity(value) {
  return value;
}

/**
 * Returns max value of an array. Returns undefined if the target array is empty.
 *
 * @template T
 * @template [R=T] Default is `T`
 * @param {T[]} values
 * @param {(value: T, index?: number, values?: T[]) => R} [valueOf=identity] Default is `identity`
 * @returns {R | undefined}
 */
export function max(values, valueOf = identity) {
  if (values.length === 0) return undefined;
  let max = valueOf(values[0], 0, values);
  for (let index = 1, value; index < values.length; index++) {
    value = valueOf(values[index], index, values);
    if (value != null && max < value) max = value;
  }
  return max;
}

/**
 * Returns min value of an array. Returns undefined if the target array is empty.
 *
 * @template T
 * @template [R=T] Default is `T`
 * @param {T[]} values
 * @param {(value: T, index?: number, values?: T[]) => R} [valueOf=identity] Default is `identity`
 * @returns {R | undefined}
 */
export function min(values, valueOf = identity) {
  if (values.length === 0) return undefined;
  let min = valueOf(values[0], 0, values);
  for (let index = 1, value; index < values.length; index++) {
    value = valueOf(values[index], index, values);
    if (value != null && min > value) min = value;
  }
  return min;
}

let e10 = Math.sqrt(50);
let e5 = Math.sqrt(10);
let e2 = Math.sqrt(2);

export function linearTicks(start, stop, count) {
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
 * A comparator that ensures ascending order and handles nulls and NaNs. Resulting order is
 * following: [x0, x1, x2, x3, x..., NaN..., null..., undefined...]
 *
 * @template T
 * @param {T} a
 * @param {T} b
 */
export function ascending(a, b) {
  // prettier-ignore
  return Object.is(a, b) ? 0 : a === null ? 1 : b === null ? -1 : a < b ? -1 : a > b ? 1 : isNaN(a) ? 1 : isNaN(b) ? -1 : 0;
}

/**
 * A comparator that ensures descending order and handles nulls and NaNs. Resulting order is
 * following: [x4, x3, x2, x1, x..., NaN..., null..., undefined...]
 *
 * @template T
 * @param {T} a
 * @param {T} b
 */
export function descending(a, b) {
  // prettier-ignore
  return Object.is(a, b) ? 0 : a === null ? 1 : b === null ? -1 : a < b ? 1 : a > b ? -1 : isNaN(a) ? 1 : isNaN(b) ? -1 : 0;
}
