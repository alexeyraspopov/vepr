import { bisect, ascending } from "./array.js";

/**
 * Create a function to interpolate number in range [0..1] to a continuous range
 * [r1..r2]
 *
 * @param {number} r1
 * @param {number} r2
 * @returns {(t: number) => number}
 */
export function interpolateLinear(r1, r2) {
  let k = r2 - r1;
  return k === 0 ? (_) => r1 : (t) => r1 + k * t;
}

/**
 * Create a function to interpolate number in range [0..1] to a discrete value
 * of given set
 *
 * @template T
 * @param {T[]} vs
 * @returns {(t: number) => T}
 */
export function interpolateDiscrete(vs) {
  // QUESTION should it clamp by default?
  let n = vs.length;
  return (t) => vs[Math.max(0, Math.min(Math.floor(t * n), n - 1))];
}

/**
 * @param {number} d1
 * @param {number} d2
 * @returns {(x: number) => number}
 */
export function normalizeLinear(d1, d2) {
  let k = d2 - d1;
  return k === 0 ? (_) => 0.5 : (x) => (x - d1) / k;
}

/**
 * @param {number[]} vs
 * @returns {(x: number) => number}
 */
export function normalizeQuantile(vs) {
  let n = 100;

  let rank = new Uint32Array(vs);
  for (let i = 0; i < rank.length; i++) rank[i] = i;
  rank.sort((iA, iB) => ascending(vs[iA], vs[iB]));
  // TODO ignore NaN, null, undefined, find insertion point to avoid those in pointers

  let thresholds = new Float64Array(n - 1);
  // TODO replace vs.length with hard limit to dismiss missing/invalid elements in population
  for (let j = 0, c = vs.length; j < n; j++) {
    let p = (j + 1) / n;
    let i = (c - 1) * p;
    let i0 = Math.floor(i);
    let value0 = vs[rank[i0]];
    let value1 = vs[rank[i0 + 1]];
    thresholds[j] = value0 + (value1 - value0) * (i - i0);
  }

  return (x) => (isNaN(x) ? NaN : bisect(thresholds, x) / (n - 1));
}

/**
 * @param {number} d1
 * @param {number} d2
 * @returns {(x: number) => number}
 */
export function normalizeQuantize(d1, d2) {
  let n = 100;

  let thresholds = new Float64Array(n - 1);
  for (let i = 0; i < n; i++) {
    thresholds[i] = ((i + 1) * d2 - (i - 1 - n) * d1) / n;
  }

  return (x) => (isNaN(x) ? NaN : bisect(thresholds, x) / (n - 1));
}

/**
 * @param {number} d1
 * @param {number} d2
 * @param {number} d3
 * @returns {(x: number) => number}
 */
export function normalizeDiverging(d1, d2, d3) {
  let k10 = d1 === d2 ? 0 : 0.5 / (d2 - d1);
  let k21 = d2 === d3 ? 0 : 0.5 / (d3 - d2);
  let sign = d2 < d1 ? -1 : 1;
  return (x) => 0.5 + (x - d2) * (sign * x < sign * d2 ? k10 : k21);
}

/**
 * @template T
 * @param {T[]} vs
 * @param {number} [paddingInner=0] Default is `0`
 * @param {number} [paddingOuter=0] Default is `0`
 * @param {number} [align=0.5] Default is `0.5`
 * @returns {((x: T) => number) & { width: number }}
 */
export function normalizeBand(vs, paddingInner = 0, paddingOuter = 0, align = 0.5) {
  let count = vs.length;
  let step = 1 / Math.max(1, count - paddingInner + paddingOuter * 2);
  let start = (1 - step * (count - paddingInner)) * align;
  let width = step * (1 - paddingInner);
  return Object.assign((x) => step * vs.indexOf(x) + start, { width });
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {(x: number) => number}
 */
export function clamp(a, b) {
  return (x) => Math.max(a, Math.min(x, b));
}
