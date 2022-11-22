import { identity, min, max, ascending } from "./array.js";

export function quantile(values, p, valueOf = identity) {
  let n = values.length;
  let vs = Float64Array.from(numbers(values, valueOf));
  if (n === 0) return;
  if ((p = +p) <= 0 || n < 2) return min(vs);
  if (p >= 1) return max(vs);
  let i = (n - 1) * p;
  let i0 = Math.floor(i);
  let value0 = max(quickselect(vs, i0).subarray(0, i0 + 1));
  let value1 = min(vs.subarray(i0 + 1));
  return value0 + (value1 - value0) * (i - i0);
}

export function quantileSorted(values, p, valueOf = identity) {
  var n = values.length;
  if (p <= 0 || n < 2) return +valueOf(values[0], 0, values);
  if (p >= 1) return +valueOf(values[n - 1], n - 1, values);
  let i = (n - 1) * p;
  let i0 = Math.floor(i);
  let value0 = +valueOf(values[i0]);
  let value1 = +valueOf(values[i0 + 1]);
  return value0 + (value1 - value0) * (i - i0);
}

export function medianAbsoluteDeviation(values) {
  let m = quantile(values, 0.5);
  let dev = values.map((v) => Math.abs(v - m));
  let mad = quantile(dev, 0.5);
  return mad;
}

export function interQuartileRange(values) {
  let q1 = quantile(values, 0.25);
  let q3 = quantile(values, 0.75);
  return q3 - q1;
}

function* numbers(values, valueOf) {
  for (let index = 0; index < values.length; index++) {
    let value = valueOf(values[index], index, values);
    if (value != null && (value = +value) >= value) yield value;
  }
}

function quickselect(array, k, left = 0, right = array.length - 1, compare = ascending) {
  while (right > left) {
    if (right - left > 600) {
      const n = right - left + 1;
      const m = k - left + 1;
      const z = Math.log(n);
      const s = 0.5 * Math.exp((2 * z) / 3);
      const sd = 0.5 * Math.sqrt((z * s * (n - s)) / n) * (m - n / 2 < 0 ? -1 : 1);
      const newLeft = Math.max(left, Math.floor(k - (m * s) / n + sd));
      const newRight = Math.min(right, Math.floor(k + ((n - m) * s) / n + sd));
      quickselect(array, k, newLeft, newRight, compare);
    }
    const t = array[k];
    let i = left;
    let j = right;
    swap(array, left, k);
    if (compare(array[right], t) > 0) swap(array, left, right);
    while (i < j) {
      swap(array, i, j), ++i, --j;
      while (compare(array[i], t) < 0) ++i;
      while (compare(array[j], t) > 0) --j;
    }
    if (compare(array[left], t) === 0) swap(array, left, j);
    else ++j, swap(array, j, right);
    if (j <= k) left = j + 1;
    if (k <= j) right = j - 1;
  }
  return array;
}

function swap(array2, i, j) {
  const t = array2[i];
  array2[i] = array2[j];
  array2[j] = t;
}
