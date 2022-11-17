import { bisect, rank, quantileSorted } from "./array";

export function Linear(domain, range) {
  return domain.length > 2 || range.length > 2
    ? PolyLinear(domain, range)
    : (x) => interpolate(range, normalize(domain, x));
}

export function Pow(domain, range, exponent = 1) {
  let pow = (x) => (x < 0 ? -((-x) ** exponent) : x ** exponent);
  let linear = Linear(domain.map(pow), range);
  return (x) => linear(pow(x));
}

export function Log(domain, range, base = Math.E) {
  let log = logp(base);
  let linear = Linear(domain.map(log), range);
  return (x) => linear(log(x));
}

function logp(base) {
  if (base === Math.E) return Math.log;
  if (base === 10) return Math.log10;
  if (base === 2) return Math.log2;
  return (base = Math.log(base)), (x) => Math.log(x) / base;
}

function PolyLinear(domain, range) {
  let limit = Math.min(domain.length, range.length) - 1;
  let lines = Array.from({ length: limit }, (_, i) => {
    return Linear([domain[i], domain[i + 1]], [range[i], range[i + 1]]);
  });
  return (x) => lines[bisect(domain, x, 1, limit) - 1](x);
}

export function Ordinal(domain, range) {
  return (x) => range[domain.indexOf(x)];
}

export function Threshold(domain, range) {
  return (x) => range[bisect(domain, x)];
}

export function Clamp(range) {
  return (x) => Math.max(range[0], Math.min(x, range[1]));
}

export function Quantile(domain, range) {
  let n = range.length;
  let ps = rank(domain);
  let value = (p) => domain[p];
  let thresholds = Array.from({ length: n - 1 }, (_, i) => quantileSorted(ps, (i + 1) / n, value));
  return Threshold(thresholds, range);
}

export function Quantize(domain, range) {
  let n = range.length - 1;
  let thresholds = Array.from(
    { length: n },
    (_, i) => ((i + 1) * domain[1] - (i - n) * domain[0]) / (n + 1),
  );
  return Threshold(thresholds, range);
}

export function Diverging() {}

export function Band(domain, range, paddingInner = 0, paddingOuter = 0, align = 0.5) {
  let step = (range[1] - range[0]) / Math.max(1, domain.length - paddingInner + paddingOuter * 2);
  let start = range[0] + (range[1] - range[0] - step * (domain.length - paddingInner)) * align;
  return (x) => {
    let index = domain.indexOf(x);
    return index >= 0 ? step * index + start : undefined;
  };
}

export function Point(domain, range, padding = 0, align = 0.5) {
  return Band(domain, range, 1, padding, align);
}

function normalize([a, b], x) {
  return (x - a) / (b - a);
}

function interpolate([a, b], x) {
  return a * (1 - x) + b * x;
}
