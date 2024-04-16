const UNIT = /^[\d.]+u$/;
const FRAC = /^[\d.]+f$/;
const PERC = /^[\d.]+%$/;

/**
 * Implements one dimensional grid-like layout binning scale.
 *
 * @example
 *   let columns = track(["20u", "1f", "50u"], containerWidth);
 *   let rows = track(["15u", "20u", "1f", "20u"], containerHeight);
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
export function track(template, length, padding = 0, gap = 0, u = 1) {
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

function sum(a, b) {
  return a + b;
}
