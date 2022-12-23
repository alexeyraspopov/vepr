import { bisect, identity, rank } from "./array.js";
import { quantileSorted } from "./quantile.js";

/**
 * Creates a function that maps continuous domain using custom interpolator
 *
 * @template Result
 * @template [Domain=number | Date] Default is `number | Date`
 * @param {[Domain, Domain]} domain
 * @param {(value: number) => Result} interpolator
 * @returns {(value: Domain) => Result}
 */
export function Sequential(domain, interpolator, transform = identity) {
  let [x0, x1] = Array.from(domain, transform);
  let k = +x1 - +x0;
  let normalize = k === 0 ? (x) => 0.5 : (x) => (x - +x0) / k;
  return (x) => interpolator(normalize(transform(x)));
}

/**
 * @template [Domain=number | Date] Default is `number | Date`
 * @param {Domain[]} domain
 * @param {number[]} range
 * @param {(value: Domain) => Domain} [transform=identity] Default is `identity`
 * @returns {(value: Domain) => number}
 */
export function Linear(domain, range, transform = identity) {
  if (domain.length > 2 || range.length > 2) {
    let limit = Math.min(domain.length, range.length) - 1;
    let lines = Array.from({ length: limit }, (_, i) => {
      return Linear([domain[i], domain[i + 1]], [range[i], range[i + 1]], transform);
    });
    return (x) => lines[bisect(domain, x, 1, limit) - 1](x);
  }
  let [x0, x1] = range;
  let interpolate = (x) => x0 * (1 - x) + x1 * x;
  return Sequential([domain[0], domain[1]], interpolate, transform);
}

/**
 * @template D
 * @template R
 * @param {D[]} domain
 * @param {R[]} range
 * @returns {(value: D) => R | undefined}
 */
export function Ordinal(domain, range) {
  return (x) => range[domain.indexOf(x)];
}

/**
 * @template [D=number | Date] Default is `number | Date`
 * @template [R=string | boolean | number | Date] Default is `string | boolean | number | Date`
 * @param {D[]} domain
 * @param {R[]} range
 * @returns {(value: D) => R | undefined}
 */
export function Threshold(domain, range) {
  return (x) => range[bisect(domain, x)];
}

/**
 * @param {[number, number]} range
 * @returns {(value: number) => number}
 */
export function Clamp(range) {
  return (x) => Math.max(range[0], Math.min(x, range[1]));
}

/**
 * @template R
 * @param {number[]} domain
 * @param {R[]} range
 * @returns {(value: number) => R | undefined}
 */
export function Quantile(domain, range) {
  let n = range.length;
  let pointers = rank(domain);
  let value = (pointer) => domain[pointer];
  let thresholds = Array.from({ length: n - 1 }, (_, i) => {
    return quantileSorted(pointers, (i + 1) / n, value);
  });
  return Threshold(thresholds, range);
}

/**
 * @template R
 * @param {[number, number]} domain
 * @param {R[]} range
 * @returns {(value: number) => R | undefined}
 */
export function Quantize(domain, range) {
  let n = range.length - 1;
  let thresholds = Array.from(
    { length: n },
    (_, i) => ((i + 1) * domain[1] - (i - n) * domain[0]) / (n + 1),
  );
  return Threshold(thresholds, range);
}

/**
 * @template Result
 * @param {[number, number, number]} domain
 * @param {(value: number) => Result} interpolator
 * @param {(value: number) => number} [transform=identity] Default is `identity`
 * @returns {(value: number) => Result}
 */
export function Diverging(domain, interpolator, transform = identity) {
  let [x0, x1, x2] = Array.from(domain, transform);
  let k10 = x0 === x1 ? 0 : 0.5 / (x1 - x0);
  let k21 = x1 === x2 ? 0 : 0.5 / (x2 - x1);
  let sign = x1 < x0 ? -1 : 1;
  let normalize = (x) => 0.5 + (x - x1) * (sign * x < sign * x1 ? k10 : k21);
  return (x) => interpolator(normalize(transform(x)));
}

/**
 * @template [Domain=string | boolean | number | Date] Default is `string | boolean | number | Date`
 * @param {Domain[]} domain
 * @param {number[]} range
 * @param {number} [paddingInner=0] Default is `0`
 * @param {number} [paddingOuter=0] Default is `0`
 * @param {number} [align=0.5] Default is `0.5`
 * @returns {((value: Domain) => number | undefined) & { bandwidth: () => number }}
 */
export function Band(domain, range, paddingInner = 0, paddingOuter = 0, align = 0.5) {
  let reverse = range[1] < range[0];
  let r0 = reverse ? range[1] : range[0];
  let r1 = reverse ? range[0] : range[1];
  let step = (r1 - r0) / Math.max(1, domain.length - paddingInner + paddingOuter * 2);
  let bandwidth = step * (1 - paddingInner);
  let start = r0 + (r1 - r0 - step * (domain.length - paddingInner)) * align;
  return Object.assign(
    (x) => {
      let i = domain.indexOf(x);
      let index = reverse && i >= 0 ? domain.length - 1 - i : i;
      return index >= 0 ? step * index + start : undefined;
    },
    { bandwidth: () => bandwidth },
  );
}

/**
 * @template [Domain=string | boolean | number | Date] Default is `string | boolean | number | Date`
 * @param {Domain[]} domain
 * @param {number[]} range
 * @param {number} [padding=0] Default is `0`
 * @param {number} [align=0.5] Default is `0.5`
 */
export function Point(domain, range, padding = 0, align = 0.5) {
  return Band(domain, range, 1, padding, align);
}

const UNIT = /^[\d\.]+u$/;
const FRAC = /^[\d\.]+f$/;
const PERC = /^[\d\.]+%$/;

/**
 * Implements one dimensional grid-like layout binning scale.
 *
 * @example
 *   let columns = Track(["20u", "1f", "50u"], containerWidth);
 *   let rows = Track(["15u", "20u", "1f", "20u"], containerHeight);
 *   let [x0, x1] = columns(1);
 *   let scaleX = scaleLinear(domainX, [x0, x1]);
 *
 * @param {string[]} template
 * @param {number} length
 * @param {number} [padding=0] Default is `0`
 * @param {number} [gap=0] Default is `0`
 * @param {number} [u=1] Default is `1`
 * @returns {(start: number, span?: number) => [number, number]}
 */
export function Track(template, length, padding = 0, gap = 0, u = 1) {
  let n = template.length;
  let cLength = length - 2 * padding;
  let nUnits = 0;
  let nFractions = 0;
  let nPercents = 0;
  for (let index = 0; index < n; index++) {
    let def = template[index];
    if (FRAC.test(def)) nFractions += parseFloat(def);
    else if (UNIT.test(def)) nUnits += parseFloat(def);
    else if (PERC.test(def)) nPercents += parseFloat(def);
  }
  let f = Math.max(
    0,
    (length - 2 * padding - nUnits * u - nPercents * (cLength / 100) - (n - 1) * gap) / nFractions,
  );
  let bins = template.map((def) => {
    if (FRAC.test(def)) return parseFloat(def) * f;
    else if (UNIT.test(def)) return parseFloat(def) * u;
    else if (PERC.test(def)) return parseFloat(def) * (cLength / 100);
    else throw new Error(`Unknown unit ${def}`);
  });
  let sum = (a, b) => a + b;
  return (start, span = 1) => {
    if (start < 0 || span < 0) throw new Error("invariant");
    let offset = reduce(bins, 0, start, sum, 0) + padding + start * gap;
    let limit = reduce(bins, start, span, sum, 0) + (span - 1) * gap;
    return [offset, offset + limit];
  };
}

function reduce(array, offset, limit, reducer, result) {
  for (let index = offset; index < offset + limit; index++) {
    result = reducer(result, array[index]);
  }
  return result;
}
