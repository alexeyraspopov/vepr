/* This test suite contains original test cases from d3-scale in order to cover
compatibility of normalize and interpolate functions. */

import {
  interpolateLinear,
  interpolateDiscrete,
  normalizeBand,
  normalizeLinear,
  normalizeDiverging,
  normalizeQuantile,
  normalizeQuantize,
  clamp,
} from "./function";

import { test, expect } from "vitest";
import assert from "assert";
import { linearTicks } from "./array";

function roundEpsilon(x: number) {
  return Math.round(x * 1e12) / 1e12;
}

function scaleLinear() {
  return {} as any;
}

function scaleDiverging() {
  return {} as any;
}

function scaleDivergingLog() {
  return {} as any;
}

function scaleQuantile() {
  return {} as any;
}

function scaleQuantize() {
  return {} as any;
}

function scaleBand() {
  return {} as any;
}

// Linear

test("scaleLinear() has the expected defaults", () => {
  let n = normalizeLinear(0, 1);
  let i = interpolateLinear(0, 1);
  let s = (x: number) => i(n(x));
  expect(s(0.5)).toEqual(0.5);
  // assert.deepStrictEqual(s.interpolate()({ array: ["red"] }, { array: ["blue"] })(0.5), {array: ["rgb(128, 0, 128)"], });
});

test("scaleLinear(range) sets the range", () => {
  let n = normalizeLinear(0, 1);
  let i = interpolateLinear(1, 2);
  let s = (x: number) => i(n(x));
  expect(s(0.5)).toEqual(1.5);
});

test("scaleLinear(domain, range) sets the domain and range", () => {
  let n = normalizeLinear(1, 2);
  let i = interpolateLinear(3, 4);
  let s = (x: number) => i(n(x));
  expect(s(1.5)).toEqual(3.5);
});

test("linear(x) maps a domain value x to a range value y", () => {
  let n = normalizeLinear(0, 1);
  let i = interpolateLinear(1, 2);
  let s = (x: number) => i(n(x));
  expect(s(0.5)).toEqual(1.5);
});

test("linear(x) ignores extra range values if the domain is smaller than the range", () => {
  let n = normalizeLinear(-10, 0);
  let i = interpolateLinear(0, 1 /*, 2*/);
  let c = clamp(-10, 0);
  let s = (x: number) => i(n(c(x)));
  expect(s(-5)).toEqual(0.5);
  expect(s(50)).toEqual(1);
});

test("linear(x) ignores extra domain values if the range is smaller than the domain", () => {
  let n = normalizeLinear(-10, 0 /*, 100*/);
  let i = interpolateLinear(0, 1);
  let c = clamp(-10, 0);
  let s = (x: number) => i(n(c(x)));
  expect(s(-5)).toEqual(0.5);
  expect(s(50)).toEqual(1);
});

test("linear(x) maps an empty domain to the middle of the range", () => {
  let n = normalizeLinear(0, 0);
  let i1 = interpolateLinear(1, 2);
  let s1 = (x: number) => i1(n(x));
  expect(s1(0)).toEqual(1.5);
  let i2 = interpolateLinear(2, 1);
  let s2 = (x: number) => i2(n(x));
  expect(s2(1)).toEqual(1.5);
});

test("linear(x) can map a bilinear domain with two values to the corresponding range", () => {
  let n = normalizeLinear(1, 2);
  let i = interpolateLinear(0, 1);
  let s = (x: number) => i(n(x));
  expect(s(0.5)).toEqual(-0.5);
  expect(s(1.0)).toEqual(0.0);
  expect(s(1.5)).toEqual(0.5);
  expect(s(2.0)).toEqual(1.0);
  expect(s(2.5)).toEqual(1.5);
  let ni = normalizeLinear(0, 1);
  let ii = interpolateLinear(1, 2);
  let si = (t: number) => ii(ni(t));
  expect(si(-0.5)).toEqual(0.5);
  expect(si(0.0)).toEqual(1.0);
  expect(si(0.5)).toEqual(1.5);
  expect(si(1.0)).toEqual(2.0);
  expect(si(1.5)).toEqual(2.5);
});

test.skip("linear(x) can map a polylinear domain with more than two values to the corresponding range", () => {
  const s = scaleLinear().domain([-10, 0, 100]).range(["red", "white", "green"]);
  assert.deepStrictEqual(s.domain(), [-10, 0, 100]);
  assert.strictEqual(s(-5), "rgb(255, 128, 128)");
  assert.strictEqual(s(50), "rgb(128, 192, 128)");
  assert.strictEqual(s(75), "rgb(64, 160, 64)");
  s.domain([4, 2, 1]).range([1, 2, 4]);
  assert.strictEqual(s(1.5), 3);
  assert.strictEqual(s(3), 1.5);
  assert.strictEqual(s.invert(1.5), 3);
  assert.strictEqual(s.invert(3), 1.5);
  s.domain([1, 2, 4]).range([4, 2, 1]);
  assert.strictEqual(s(1.5), 3);
  assert.strictEqual(s(3), 1.5);
  assert.strictEqual(s.invert(1.5), 3);
  assert.strictEqual(s.invert(3), 1.5);
});

test.skip("linear.invert(y) maps a range value y to a domain value x", () => {
  assert.strictEqual(scaleLinear().range([1, 2]).invert(1.5), 0.5);
});

test("linear.invert(y) maps an empty range to the middle of the domain", () => {
  let domain = [1, 2] as const;
  let range = [0, 0] as const;
  let n = normalizeLinear(...range);
  let i1 = interpolateLinear(...domain);
  let s1 = (x: number) => i1(n(x));
  let i2 = interpolateLinear(...(domain.slice().reverse() as [number, number]));
  let s2 = (x: number) => i2(n(x));
  expect(s1(0)).toEqual(1.5);
  expect(s2(1)).toEqual(1.5);
});

test.skip("linear.invert(y) coerces range values to numbers", () => {
  assert.strictEqual(scaleLinear().range(["0", "2"]).invert("1"), 0.5);
  assert.strictEqual(
    scaleLinear()
      .range([new Date(1990, 0, 1), new Date(1991, 0, 1)])
      .invert(new Date(1990, 6, 2, 13)),
    0.5,
  );
});

test.skip("linear.invert(y) returns NaN if the range is not coercible to number", () => {
  assert(isNaN(scaleLinear().range(["#000", "#fff"]).invert("#999")));
  assert(isNaN(scaleLinear().range([0, "#fff"]).invert("#999")));
});

test.skip("linear.domain(domain) coerces domain values to numbers", () => {
  assert.deepStrictEqual(
    scaleLinear()
      .domain([new Date(1990, 0, 1), new Date(1991, 0, 1)])
      .domain(),
    [631180800000, 662716800000],
  );
  assert.deepStrictEqual(scaleLinear().domain(["0.0", "1.0"]).domain(), [0, 1]);
  assert.deepStrictEqual(
    scaleLinear()
      .domain([new Number(0), new Number(1)])
      .domain(),
    [0, 1],
  );
});

test.skip("linear.range(range) can accept range values as colors", () => {
  assert.strictEqual(scaleLinear().range(["red", "blue"])(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(scaleLinear().range(["#ff0000", "#0000ff"])(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(scaleLinear().range(["#f00", "#00f"])(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(
    scaleLinear().range(["rgb(255,0,0)", "hsl(240,100%,50%)"])(0.5),
    "rgb(128, 0, 128)",
  );
  assert.strictEqual(
    scaleLinear().range(["rgb(100%,0%,0%)", "hsl(240,100%,50%)"])(0.5),
    "rgb(128, 0, 128)",
  );
  assert.strictEqual(
    scaleLinear().range(["hsl(0,100%,50%)", "hsl(240,100%,50%)"])(0.5),
    "rgb(128, 0, 128)",
  );
});

test.skip("linear.range(range) can accept range values as arrays or objects", () => {
  assert.deepStrictEqual(scaleLinear().range([{ color: "red" }, { color: "blue" }])(0.5), {
    color: "rgb(128, 0, 128)",
  });
  assert.deepStrictEqual(scaleLinear().range([["red"], ["blue"]])(0.5), ["rgb(128, 0, 128)"]);
});

test("linear.rangeRound(range) is an alias for linear.range(range).interpolate(interpolateRound)", () => {
  let n = normalizeLinear(0, 1);
  let i = interpolateLinear(0, 10);
  let s = (x: number) => Math.round(i(n(x)));
  expect(s(0.59)).toEqual(6);
});

test("linear.unknown(value) sets the return value for undefined, null, and NaN input", () => {
  let n = normalizeLinear(0, 1);
  let i = interpolateLinear(0, 1);
  let s = (x: any) => (x == null || isNaN(x) ? -1 : i(n(x)));
  expect(s(null)).toEqual(-1);
  expect(s(undefined)).toEqual(-1);
  expect(s(NaN)).toEqual(-1);
  expect(s("N/A")).toEqual(-1);
  expect(s(0.4)).toEqual(0.4);
});

test("linear.clamp() is false by default", () => {
  let n = normalizeLinear(0, 1);
  let i = interpolateLinear(10, 20);
  let s = (x: number) => i(n(x));
  expect(s(2)).toEqual(30);
  expect(s(-1)).toEqual(0);
  // assert.strictEqual(scaleLinear().range([10, 20]).invert(30), 2);
  // assert.strictEqual(scaleLinear().range([10, 20]).invert(0), -1);
});

test("linear.clamp(true) restricts output values to the range", () => {
  let n = normalizeLinear(0, 1);
  let i = interpolateLinear(10, 20);
  let c = clamp(0, 1);
  let s = (x: number) => i(n(c(x)));
  expect(s(2)).toEqual(20);
  expect(s(-1)).toEqual(10);
});

test.skip("linear.clamp(true) restricts input values to the domain", () => {
  assert.strictEqual(scaleLinear().clamp(true).range([10, 20]).invert(30), 1);
  assert.strictEqual(scaleLinear().clamp(true).range([10, 20]).invert(0), 0);
});

test.skip("linear.nice() is an alias for linear.nice(10)", () => {
  assert.deepStrictEqual(scaleLinear().domain([0, 0.96]).nice().domain(), [0, 1]);
  assert.deepStrictEqual(scaleLinear().domain([0, 96]).nice().domain(), [0, 100]);
});

test.skip("linear.nice(count) extends the domain to match the desired ticks", () => {
  assert.deepStrictEqual(scaleLinear().domain([0, 0.96]).nice(10).domain(), [0, 1]);
  assert.deepStrictEqual(scaleLinear().domain([0, 96]).nice(10).domain(), [0, 100]);
  assert.deepStrictEqual(scaleLinear().domain([0.96, 0]).nice(10).domain(), [1, 0]);
  assert.deepStrictEqual(scaleLinear().domain([96, 0]).nice(10).domain(), [100, 0]);
  assert.deepStrictEqual(scaleLinear().domain([0, -0.96]).nice(10).domain(), [0, -1]);
  assert.deepStrictEqual(scaleLinear().domain([0, -96]).nice(10).domain(), [0, -100]);
  assert.deepStrictEqual(scaleLinear().domain([-0.96, 0]).nice(10).domain(), [-1, 0]);
  assert.deepStrictEqual(scaleLinear().domain([-96, 0]).nice(10).domain(), [-100, 0]);
  assert.deepStrictEqual(scaleLinear().domain([-0.1, 51.1]).nice(8).domain(), [-10, 60]);
});

test.skip("linear.nice(count) nices the domain, extending it to round numbers", () => {
  assert.deepStrictEqual(scaleLinear().domain([1.1, 10.9]).nice(10).domain(), [1, 11]);
  assert.deepStrictEqual(scaleLinear().domain([10.9, 1.1]).nice(10).domain(), [11, 1]);
  assert.deepStrictEqual(scaleLinear().domain([0.7, 11.001]).nice(10).domain(), [0, 12]);
  assert.deepStrictEqual(scaleLinear().domain([123.1, 6.7]).nice(10).domain(), [130, 0]);
  assert.deepStrictEqual(scaleLinear().domain([0, 0.49]).nice(10).domain(), [0, 0.5]);
  assert.deepStrictEqual(scaleLinear().domain([0, 14.1]).nice(5).domain(), [0, 20]);
  assert.deepStrictEqual(scaleLinear().domain([0, 15]).nice(5).domain(), [0, 20]);
});

test.skip("linear.nice(count) has no effect on degenerate domains", () => {
  assert.deepStrictEqual(scaleLinear().domain([0, 0]).nice(10).domain(), [0, 0]);
  assert.deepStrictEqual(scaleLinear().domain([0.5, 0.5]).nice(10).domain(), [0.5, 0.5]);
});

test.skip("linear.nice(count) nicing a polylinear domain only affects the extent", () => {
  assert.deepStrictEqual(
    scaleLinear().domain([1.1, 1, 2, 3, 10.9]).nice(10).domain(),
    [1, 1, 2, 3, 11],
  );
  assert.deepStrictEqual(
    scaleLinear().domain([123.1, 1, 2, 3, -0.9]).nice(10).domain(),
    [130, 1, 2, 3, -10],
  );
});

test.skip("linear.nice(count) accepts a tick count to control nicing step", () => {
  assert.deepStrictEqual(scaleLinear().domain([12, 87]).nice(5).domain(), [0, 100]);
  assert.deepStrictEqual(scaleLinear().domain([12, 87]).nice(10).domain(), [10, 90]);
  assert.deepStrictEqual(scaleLinear().domain([12, 87]).nice(100).domain(), [12, 87]);
});

test.skip("linear.ticks(count) returns the expected ticks for an ascending domain", () => {
  const s = scaleLinear();
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(10).map(roundEpsilon), [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(9).map(roundEpsilon),  [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(8).map(roundEpsilon),  [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(7).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(6).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(5).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(4).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(3).map(roundEpsilon),  [0.0,                     0.5,                     1.0]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(2).map(roundEpsilon),  [0.0,                     0.5,                     1.0]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(1).map(roundEpsilon),  [0.0,                                              1.0]);
  s.domain([-100, 100]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(10), [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(9),  [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(8),  [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(7),  [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(6),  [-100,           -50,           0,         50,         100]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(5),  [-100,           -50,           0,         50,         100]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(4),  [-100,           -50,           0,         50,         100]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(3),  [-100,           -50,           0,         50,         100]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(2),  [-100,                          0,                     100]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(1),  [                               0                         ]);
});

test.skip("linear.ticks(count) returns the expected ticks for a descending domain", () => {
  const s = scaleLinear().domain([1, 0]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(10).map(roundEpsilon), [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].reverse());
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(9).map(roundEpsilon),  [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].reverse());
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(8).map(roundEpsilon),  [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].reverse());
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(7).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0].reverse());
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(6).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0].reverse());
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(5).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0].reverse());
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(4).map(roundEpsilon),  [0.0,      0.2,      0.4,      0.6,      0.8,      1.0].reverse());
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(3).map(roundEpsilon),  [0.0,                     0.5,                     1.0].reverse());
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(2).map(roundEpsilon),  [0.0,                     0.5,                     1.0].reverse());
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(1).map(roundEpsilon),  [0.0,                                              1.0].reverse());
  s.domain([100, -100]);
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(10), [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100].reverse());
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(9),  [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100].reverse());
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(8),  [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100].reverse());
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(7),  [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100].reverse());
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(6),  [-100,           -50,           0,         50,         100].reverse());
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(5),  [-100,           -50,           0,         50,         100].reverse());
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(4),  [-100,           -50,           0,         50,         100].reverse());
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(3),  [-100,           -50,           0,         50,         100].reverse());
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(2),  [-100,                          0,                     100].reverse());
  // prettier-ignore
  assert.deepStrictEqual(s.ticks(1),  [                               0                         ].reverse());
});

test("linear.ticks(count) returns the expected ticks for a polylinear domain", () => {
  // prettier-ignore
  expect(linearTicks(0, 1, 10)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  // prettier-ignore
  expect(linearTicks(0, 1, 9)).toEqual( [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  // prettier-ignore
  expect(linearTicks(0, 1, 8)).toEqual( [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  // prettier-ignore
  expect(linearTicks(0, 1, 7)).toEqual( [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  // prettier-ignore
  expect(linearTicks(0, 1, 6)).toEqual( [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  // prettier-ignore
  expect(linearTicks(0, 1, 5)).toEqual( [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  // prettier-ignore
  expect(linearTicks(0, 1, 4)).toEqual( [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  // prettier-ignore
  expect(linearTicks(0, 1, 3)).toEqual( [0.0,                     0.5,                     1.0]);
  // prettier-ignore
  expect(linearTicks(0, 1, 2)).toEqual( [0.0,                     0.5,                     1.0]);
  // prettier-ignore
  expect(linearTicks(0, 1, 1)).toEqual( [0.0,                                              1.0]);

  // prettier-ignore
  expect(linearTicks(-100, 100, 10)).toEqual([-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
  // prettier-ignore
  expect(linearTicks(-100, 100, 9)).toEqual( [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
  // prettier-ignore
  expect(linearTicks(-100, 100, 8)).toEqual( [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
  // prettier-ignore
  expect(linearTicks(-100, 100, 7)).toEqual( [-100, -80, -60,      -40, -20, 0, 20, 40,     60, 80, 100]);
  // prettier-ignore
  expect(linearTicks(-100, 100, 6)).toEqual( [-100,           -50,           0,         50,         100]);
  // prettier-ignore
  expect(linearTicks(-100, 100, 5)).toEqual( [-100,           -50,           0,         50,         100]);
  // prettier-ignore
  expect(linearTicks(-100, 100, 4)).toEqual( [-100,           -50,           0,         50,         100]);
  // prettier-ignore
  expect(linearTicks(-100, 100, 3)).toEqual( [-100,           -50,           0,         50,         100]);
  // prettier-ignore
  expect(linearTicks(-100, 100, 2)).toEqual( [-100,                          0,                     100]);
  // FIXME
  // prettier-ignore
  // expect(linearTicks(-100, 100, 1)).toEqual( [                               0                         ]);
});

test.skip("linear.ticks(X) spans linear.nice(X).domain()", () => {
  function check(domain, count) {
    const s = scaleLinear().domain(domain).nice(count);
    const ticks = s.ticks(count);
    assert.deepStrictEqual([ticks[0], ticks[ticks.length - 1]], s.domain());
  }
  check([1, 9], 2);
  check([1, 9], 3);
  check([1, 9], 4);
  check([8, 9], 2);
  check([8, 9], 3);
  check([8, 9], 4);
  check([1, 21], 2);
  check([2, 21], 2);
  check([3, 21], 2);
  check([4, 21], 2);
  check([5, 21], 2);
  check([6, 21], 2);
  check([7, 21], 2);
  check([8, 21], 2);
  check([9, 21], 2);
  check([10, 21], 2);
  check([11, 21], 2);
});

// Diverging

test("scaleDiverging() has the expected defaults", () => {
  let n = normalizeDiverging(0, 0.5, 1);
  let i = interpolateLinear(0, 1);
  let s = (x: number) => i(n(x));
  expect(s(-0.5)).toEqual(-0.5);
  expect(s(0.0)).toEqual(0.0);
  expect(s(0.5)).toEqual(0.5);
  expect(s(1.0)).toEqual(1.0);
  expect(s(1.5)).toEqual(1.5);
});

test("diverging.clamp(true) enables clamping", () => {
  let n = normalizeDiverging(0, 0.5, 1);
  let i = interpolateLinear(0, 1);
  let clamp = (x: number) => Math.max(0, Math.min(x, 1));
  let s = (x: number) => i(n(clamp(x)));
  expect(s(-0.5)).toEqual(0.0);
  expect(s(0.0)).toEqual(0.0);
  expect(s(0.5)).toEqual(0.5);
  expect(s(1.0)).toEqual(1.0);
  expect(s(1.5)).toEqual(1.0);
});

test("diverging.domain() handles a degenerate domain", () => {
  let n1 = normalizeDiverging(2, 2, 3);
  let i1 = interpolateLinear(0, 1);
  let s1 = (x: number) => i1(n1(x));
  expect(s1(-1.2)).toEqual(0.5);
  expect(s1(0.6)).toEqual(0.5);
  expect(s1(2.4)).toEqual(0.7);

  let n2 = normalizeDiverging(1, 2, 2);
  let i2 = interpolateLinear(0, 1);
  let s2 = (x: number) => i2(n2(x));
  expect(s2(-1.0)).toEqual(-1);
  expect(s2(0.5)).toEqual(-0.25);
  expect(s2(2.4)).toEqual(0.5);

  let n3 = normalizeDiverging(2, 2, 2);
  let i3 = interpolateLinear(0, 1);
  let s3 = (x: number) => i3(n3(x));
  expect(s3(-1.0)).toEqual(0.5);
  expect(s3(0.5)).toEqual(0.5);
  expect(s3(2.4)).toEqual(0.5);
});

test.skip("diverging.domain() handles a descending domain", () => {
  const s = scaleDiverging().domain([4, 2, 1]);
  assert.deepStrictEqual(s.domain(), [4, 2, 1]);
  assert.strictEqual(s(1.2), 0.9);
  assert.strictEqual(s(2.0), 0.5);
  assert.strictEqual(s(3.0), 0.25);
});

test.skip("divergingLog.domain() handles a descending domain", () => {
  const s = scaleDivergingLog().domain([3, 2, 1]);
  assert.deepStrictEqual(s.domain(), [3, 2, 1]);
  assert.strictEqual(s(1.2), 1 - 0.1315172029168969);
  assert.strictEqual(s(2.0), 1 - 0.5);
  assert.strictEqual(s(2.8), 1 - 0.9149213210862197);
});

test.skip("divergingLog.domain() handles a descending negative domain", () => {
  const s = scaleDivergingLog().domain([-1, -2, -3]);
  assert.deepStrictEqual(s.domain(), [-1, -2, -3]);
  assert.strictEqual(s(-1.2), 0.1315172029168969);
  assert.strictEqual(s(-2.0), 0.5);
  assert.strictEqual(s(-2.8), 0.9149213210862197);
});

test.skip("diverging.domain() handles a non-numeric domain", () => {
  const s = scaleDiverging().domain([NaN, 2, 3]);
  assert.strictEqual(isNaN(s.domain()[0]), true);
  assert.strictEqual(isNaN(s(-1.2)), true);
  assert.strictEqual(isNaN(s(0.6)), true);
  assert.strictEqual(s(2.4), 0.7);
  assert.strictEqual(isNaN(s.domain([1, NaN, 2]).domain()[1]), true);
  assert.strictEqual(isNaN(s(-1.0)), true);
  assert.strictEqual(isNaN(s(0.5)), true);
  assert.strictEqual(isNaN(s(2.4)), true);
  assert.strictEqual(isNaN(s.domain([0, 1, NaN]).domain()[2]), true);
  assert.strictEqual(s(-1.0), -0.5);
  assert.strictEqual(s(0.5), 0.25);
  assert.strictEqual(isNaN(s(2.4)), true);
});

test.skip("diverging.domain() only considers the first three elements of the domain", () => {
  const s = scaleDiverging().domain([-1, 100, 200, 3]);
  assert.deepStrictEqual(s.domain(), [-1, 100, 200]);
});

test.skip("diverging.copy() returns an isolated copy of the scale", () => {
  const s1 = scaleDiverging().domain([1, 2, 3]).clamp(true);
  const s2 = s1.copy();
  assert.deepStrictEqual(s2.domain(), [1, 2, 3]);
  assert.strictEqual(s2.clamp(), true);
  s1.domain([-1, 1, 2]);
  assert.deepStrictEqual(s2.domain(), [1, 2, 3]);
  s1.clamp(false);
  assert.strictEqual(s2.clamp(), true);
  s2.domain([3, 4, 5]);
  assert.deepStrictEqual(s1.domain(), [-1, 1, 2]);
  s2.clamp(true);
  assert.deepStrictEqual(s1.clamp(), false);
});

test("diverging.range() returns the computed range", () => {
  let n = normalizeDiverging(0, 0.5, 1);
  let i = (t: number) => t * 2 + 1;
  let s = (x: number) => i(n(x));
  expect([s(0), s(0.5), s(1)]).toEqual([1, 2, 3]);
});

test("diverging.interpolator(interpolator) sets the interpolator", () => {
  let n = normalizeDiverging(0, 0.5, 1);
  let i1 = (t: number) => t * 2;
  let s = (x: number) => i1(n(x));
  expect(s(-0.5)).toEqual(-1.0);
  expect(s(0.0)).toEqual(0.0);
  expect(s(0.5)).toEqual(1.0);
});

test.skip("diverging.range(range) sets the interpolator", () => {
  const s = scaleDiverging().range([1, 3, 10]);
  assert.strictEqual(s.interpolator()(0.5), 3);
  assert.deepStrictEqual(s.range(), [1, 3, 10]);
});

test.skip("diverging.range(range) ignores additional values", () => {
  const s = scaleDiverging().range([1, 3, 10, 20]);
  assert.strictEqual(s.interpolator()(0.5), 3);
  assert.deepStrictEqual(s.range(), [1, 3, 10]);
});

test.skip("scaleDiverging(range) sets the interpolator", () => {
  const s = scaleDiverging([1, 3, 10]);
  assert.strictEqual(s.interpolator()(0.5), 3);
  assert.deepStrictEqual(s.range(), [1, 3, 10]);
});

// Quantile

test.skip("scaleQuantile() has the expected default", () => {
  const s = scaleQuantile();
  assert.deepStrictEqual(s.domain(), []);
  assert.deepStrictEqual(s.range(), []);
  assert.strictEqual(s.unknown(), undefined);
});

test("quantile(x) uses the R-7 algorithm to compute quantiles", () => {
  let n = normalizeQuantile([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]);
  let i = interpolateDiscrete([0, 1, 2, 3]);
  let s = (x: number) => i(n(x));
  expect([3, 6, 6.9, 7, 7.1].map(s)).toEqual([0, 0, 0, 0, 0]);
  expect([8, 8.9].map(s)).toEqual([1, 1]);
  expect([9, 9.1, 10, 13].map(s)).toEqual([2, 2, 2, 2]);
  expect([14.9, 15, 15.1, 16, 20].map(s)).toEqual([3, 3, 3, 3, 3]);
  let n2 = normalizeQuantile([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20]);
  let i2 = interpolateDiscrete([0, 1, 2, 3]);
  let s2 = (x: number) => i2(n2(x));
  expect([3, 6, 6.9, 7, 7.1].map(s2)).toEqual([0, 0, 0, 0, 0]);
  expect([8, 8.9].map(s2)).toEqual([1, 1]);
  expect([9, 9.1, 10, 13].map(s2)).toEqual([2, 2, 2, 2]);
  expect([14.9, 15, 15.1, 16, 20].map(s2)).toEqual([3, 3, 3, 3, 3]);
});

test.skip("quantile(x) returns undefined if the input value is NaN", () => {
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range([0, 1, 2, 3]);
  assert.strictEqual(s(NaN), undefined);
});

test.skip("quantile.domain() values are sorted in ascending order", () => {
  const s = scaleQuantile().domain([6, 3, 7, 8, 8, 13, 20, 15, 16, 10]);
  assert.deepStrictEqual(s.domain(), [3, 6, 7, 8, 8, 10, 13, 15, 16, 20]);
});

test.skip("quantile.domain() values are coerced to numbers", () => {
  const s = scaleQuantile().domain(["6", "13", "20"]);
  assert.deepStrictEqual(s.domain(), [6, 13, 20]);
});

test.skip("quantile.domain() accepts an iterable", () => {
  const s = scaleQuantile().domain(new Set([6, 13, 20]));
  assert.deepStrictEqual(s.domain(), [6, 13, 20]);
});

test.skip("quantile.domain() values are allowed to be zero", () => {
  const s = scaleQuantile().domain([1, 2, 0, 0, null]);
  assert.deepStrictEqual(s.domain(), [0, 0, 1, 2]);
});

test.skip("quantile.domain() non-numeric values are ignored", () => {
  const s = scaleQuantile().domain([6, 3, NaN, undefined, 7, 8, 8, 13, null, 20, 15, 16, 10, NaN]);
  assert.deepStrictEqual(s.domain(), [3, 6, 7, 8, 8, 10, 13, 15, 16, 20]);
});

test.skip("quantile.quantiles() returns the inner thresholds", () => {
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range([0, 1, 2, 3]);
  assert.deepStrictEqual(s.quantiles(), [7.25, 9, 14.5]);
  s.domain([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20]).range([0, 1, 2, 3]);
  assert.deepStrictEqual(s.quantiles(), [7.5, 9, 14]);
});

test.skip("quantile.range() cardinality determines the number of quantiles", () => {
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]);
  assert.deepStrictEqual(s.range([0, 1, 2, 3]).quantiles(), [7.25, 9, 14.5]);
  assert.deepStrictEqual(s.range([0, 1]).quantiles(), [9]);
  assert.deepStrictEqual(s.range([, , , , ,]).quantiles(), [6.8, 8, 11.2, 15.2]);
  assert.deepStrictEqual(s.range([, , , , , ,]).quantiles(), [6.5, 8, 9, 13, 15.5]);
});

test.skip("quantile.range() accepts an iterable", () => {
  const s = scaleQuantile()
    .domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20])
    .range(new Set([0, 1, 2, 3]));
  assert.deepStrictEqual(s.range(), [0, 1, 2, 3]);
});

test.skip("quantile.range() values are arbitrary", () => {
  const a = {};
  const b = {};
  const c = {};
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range([a, b, c, a]);
  assert.deepStrictEqual([3, 6, 6.9, 7, 7.1].map(s), [a, a, a, a, a]);
  assert.deepStrictEqual([8, 8.9].map(s), [b, b]);
  assert.deepStrictEqual([9, 9.1, 10, 13].map(s), [c, c, c, c]);
  assert.deepStrictEqual([14.9, 15, 15.1, 16, 20].map(s), [a, a, a, a, a]);
});

test.skip("quantile.invertExtent() maps a value in the range to a domain extent", () => {
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range([0, 1, 2, 3]);
  assert.deepStrictEqual(s.invertExtent(0), [3, 7.25]);
  assert.deepStrictEqual(s.invertExtent(1), [7.25, 9]);
  assert.deepStrictEqual(s.invertExtent(2), [9, 14.5]);
  assert.deepStrictEqual(s.invertExtent(3), [14.5, 20]);
});

test.skip("quantile.invertExtent() allows arbitrary range values", () => {
  const a = {};
  const b = {};
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range([a, b]);
  assert.deepStrictEqual(s.invertExtent(a), [3, 9]);
  assert.deepStrictEqual(s.invertExtent(b), [9, 20]);
});

test.skip("quantile.invertExtent() returns [NaN, NaN] when the given value is not in the range", () => {
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]);
  assert(s.invertExtent(-1).every(isNaN));
  assert(s.invertExtent(0.5).every(isNaN));
  assert(s.invertExtent(2).every(isNaN));
  assert(s.invertExtent("a").every(isNaN));
});

test.skip("quantile.invertExtent() returns the first match if duplicate values exist in the range", () => {
  const s = scaleQuantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range([0, 1, 2, 0]);
  assert.deepStrictEqual(s.invertExtent(0), [3, 7.25]);
  assert.deepStrictEqual(s.invertExtent(1), [7.25, 9]);
  assert.deepStrictEqual(s.invertExtent(2), [9, 14.5]);
});

test.skip("quantile.unknown(value) sets the return value for undefined, null, and NaN input", () => {
  const s = scaleQuantile()
    .domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20])
    .range([0, 1, 2, 3])
    .unknown(-1);
  assert.strictEqual(s(undefined), -1);
  assert.strictEqual(s(null), -1);
  assert.strictEqual(s(NaN), -1);
  assert.strictEqual(s("N/A"), -1);
  assert.strictEqual(s(2), 0);
  assert.strictEqual(s(3), 0);
  assert.strictEqual(s(21), 3);
});

// Quantize

test("scaleQuantize() has the expected defaults", () => {
  let n = normalizeQuantize(0, 1);
  let i = interpolateDiscrete([0, 1]);
  let s = (x: number) => i(n(x));
  expect(s(0.25)).toEqual(0);
  expect(s(0.75)).toEqual(1);
});

test("quantize(value) maps a number to a discrete value in the range", () => {
  let n = normalizeQuantize(0, 1);
  let i = interpolateDiscrete([0, 1, 2]);
  let s = (x: number) => i(n(x));
  expect(s(0.0)).toEqual(0);
  expect(s(0.2)).toEqual(0);
  expect(s(0.4)).toEqual(1);
  expect(s(0.6)).toEqual(1);
  expect(s(0.8)).toEqual(2);
  expect(s(1.0)).toEqual(2);
});

test("quantize(value) clamps input values to the domain", () => {
  let a = {};
  let b = {};
  let c = {};
  let n = normalizeQuantize(0, 1);
  let i = interpolateDiscrete([a, b, c]);
  let cl = clamp(0, 1);
  let s = (x: number) => i(n(cl(x)));
  expect(s(-0.5)).toEqual(a);
  expect(s(+1.5)).toEqual(c);
});

test.skip("quantize.unknown(value) sets the return value for undefined, null, and NaN input", () => {
  const s = scaleQuantize().range([0, 1, 2]).unknown(-1);
  assert.strictEqual(s(undefined), -1);
  assert.strictEqual(s(null), -1);
  assert.strictEqual(s(NaN), -1);
});

test.skip("quantize.domain() coerces domain values to numbers", () => {
  const s = scaleQuantize().domain(["-1.20", "2.40"]);
  assert.deepStrictEqual(s.domain(), [-1.2, 2.4]);
  assert.strictEqual(s(-1.2), 0);
  assert.strictEqual(s(0.5), 0);
  assert.strictEqual(s(0.7), 1);
  assert.strictEqual(s(2.4), 1);
});

test.skip("quantize.domain() accepts an iterable", () => {
  const s = scaleQuantize().domain(new Set([1, 2]));
  assert.deepStrictEqual(s.domain(), [1, 2]);
});

test.skip("quantize.domain() only considers the first and second element of the domain", () => {
  const s = scaleQuantize().domain([-1, 100, 200]);
  assert.deepStrictEqual(s.domain(), [-1, 100]);
});

test.skip("quantize.range() cardinality determines the degree of quantization", () => {
  const s = scaleQuantize();
  assertInDelta(s.range(range(0, 1.001, 0.001))(1 / 3), 0.333, 1e-6);
  assertInDelta(s.range(range(0, 1.01, 0.01))(1 / 3), 0.33, 1e-6);
  assertInDelta(s.range(range(0, 1.1, 0.1))(1 / 3), 0.3, 1e-6);
  assertInDelta(s.range(range(0, 1.2, 0.2))(1 / 3), 0.4, 1e-6);
  assertInDelta(s.range(range(0, 1.25, 0.25))(1 / 3), 0.25, 1e-6);
  assertInDelta(s.range(range(0, 1.5, 0.5))(1 / 3), 0.5, 1e-6);
  assertInDelta(s.range(range(1))(1 / 3), 0, 1e-6);
});

test("quantize.range() values are arbitrary", () => {
  let a = {};
  let b = {};
  let c = {};
  let n = normalizeQuantize(0, 1);
  let i = interpolateDiscrete([a, b, c]);
  let s = (x: number) => i(n(x));
  expect(s(0.0)).toEqual(a);
  expect(s(0.2)).toEqual(a);
  expect(s(0.4)).toEqual(b);
  expect(s(0.6)).toEqual(b);
  expect(s(0.8)).toEqual(c);
  expect(s(1.0)).toEqual(c);
});

test.skip("quantize.invertExtent() maps a value in the range to a domain extent", () => {
  const s = scaleQuantize().range([0, 1, 2, 3]);
  assert.deepStrictEqual(s.invertExtent(0), [0.0, 0.25]);
  assert.deepStrictEqual(s.invertExtent(1), [0.25, 0.5]);
  assert.deepStrictEqual(s.invertExtent(2), [0.5, 0.75]);
  assert.deepStrictEqual(s.invertExtent(3), [0.75, 1.0]);
});

test.skip("quantize.invertExtent() allows arbitrary range values", () => {
  const a = {};
  const b = {};
  const s = scaleQuantize().range([a, b]);
  assert.deepStrictEqual(s.invertExtent(a), [0.0, 0.5]);
  assert.deepStrictEqual(s.invertExtent(b), [0.5, 1.0]);
});

test.skip("quantize.invertExtent() returns [NaN, NaN] when the given value is not in the range", () => {
  const s = scaleQuantize();
  assert(s.invertExtent(-1).every(Number.isNaN));
  assert(s.invertExtent(0.5).every(Number.isNaN));
  assert(s.invertExtent(2).every(Number.isNaN));
  assert(s.invertExtent("a").every(Number.isNaN));
});

test.skip("quantize.invertExtent() returns the first match if duplicate values exist in the range", () => {
  const s = scaleQuantize().range([0, 1, 2, 0]);
  assert.deepStrictEqual(s.invertExtent(0), [0.0, 0.25]);
  assert.deepStrictEqual(s.invertExtent(1), [0.25, 0.5]);
});

test.skip("quantize.invertExtent(y) is exactly consistent with quantize(x)", () => {
  const s = scaleQuantize().domain([4.2, 6.2]).range(range(10));
  s.range().forEach(function (y) {
    const e = s.invertExtent(y);
    assert.strictEqual(s(e[0]), y);
    assert.strictEqual(s(e[1]), y < 9 ? y + 1 : y);
  });
});

// Band

test.skip("scaleBand() has the expected defaults", () => {
  const s = scaleBand();
  assert.deepStrictEqual(s.domain(), []);
  assert.deepStrictEqual(s.range(), [0, 1]);
  assert.strictEqual(s.bandwidth(), 1);
  assert.strictEqual(s.step(), 1);
  assert.strictEqual(s.round(), false);
  assert.strictEqual(s.paddingInner(), 0);
  assert.strictEqual(s.paddingOuter(), 0);
  assert.strictEqual(s.align(), 0.5);
});

test("band(value) computes discrete bands in a continuous range", () => {
  let n1 = normalizeBand(["foo", "bar"]);
  let i1 = interpolateLinear(0, 960);
  let s1 = (x: string) => i1(n1(x));
  expect(s1("foo")).toEqual(0);
  expect(s1("bar")).toEqual(480);

  let n2 = normalizeBand(["a", "b", "c"]);
  let i2 = interpolateLinear(0, 120);
  let s2 = (x: string) => i2(n2(x));
  expect(["a", "b", "c"].map(s2)).toEqual([0, 40, 80]);
  expect(i2(n2.width)).toEqual(40);

  let n3 = normalizeBand(["a", "b", "c"], 0.2, 0.2);
  let i3 = interpolateLinear(0, 120);
  let s3 = (x: string) => i3(n3(x));
  expect(["a", "b", "c"].map(s3)).toEqual([7.5, 45, 82.5]);
  expect(i3(n3.width)).toEqual(30);
});

test.skip("band(value) returns undefined for values outside the domain", () => {
  const s = scaleBand(["a", "b", "c"], [0, 1]);
  assert.strictEqual(s("d"), undefined);
  assert.strictEqual(s("e"), undefined);
  assert.strictEqual(s("f"), undefined);
});

test.skip("band.step() returns the distance between the starts of adjacent bands", () => {
  const s = scaleBand([0, 960]);
  assert.strictEqual(s.domain(["foo"]).step(), 960);
  assert.strictEqual(s.domain(["foo", "bar"]).step(), 480);
  assert.strictEqual(s.domain(["foo", "bar", "baz"]).step(), 320);
  s.padding(0.5);
  assert.strictEqual(s.domain(["foo"]).step(), 640);
  assert.strictEqual(s.domain(["foo", "bar"]).step(), 384);
});

test.skip("band.bandwidth() returns the width of the band", () => {
  const s = scaleBand([0, 960]);
  assert.strictEqual(s.domain([]).bandwidth(), 960);
  assert.strictEqual(s.domain(["foo"]).bandwidth(), 960);
  assert.strictEqual(s.domain(["foo", "bar"]).bandwidth(), 480);
  assert.strictEqual(s.domain(["foo", "bar", "baz"]).bandwidth(), 320);
  s.padding(0.5);
  assert.strictEqual(s.domain([]).bandwidth(), 480);
  assert.strictEqual(s.domain(["foo"]).bandwidth(), 320);
  assert.strictEqual(s.domain(["foo", "bar"]).bandwidth(), 192);
});

test.skip("band.domain([]) computes reasonable band and step values", () => {
  const s = scaleBand([0, 960]).domain([]);
  assert.strictEqual(s.step(), 960);
  assert.strictEqual(s.bandwidth(), 960);
  s.padding(0.5);
  assert.strictEqual(s.step(), 960);
  assert.strictEqual(s.bandwidth(), 480);
  s.padding(1);
  assert.strictEqual(s.step(), 960);
  assert.strictEqual(s.bandwidth(), 0);
});

test.skip("band.domain([value]) computes a reasonable singleton band, even with padding", () => {
  const s = scaleBand([0, 960]).domain(["foo"]);
  assert.strictEqual(s("foo"), 0);
  assert.strictEqual(s.step(), 960);
  assert.strictEqual(s.bandwidth(), 960);
  s.padding(0.5);
  assert.strictEqual(s("foo"), 320);
  assert.strictEqual(s.step(), 640);
  assert.strictEqual(s.bandwidth(), 320);
  s.padding(1);
  assert.strictEqual(s("foo"), 480);
  assert.strictEqual(s.step(), 480);
  assert.strictEqual(s.bandwidth(), 0);
});

test.skip("band.domain(values) recomputes the bands", () => {
  const s = scaleBand().domain(["a", "b", "c"]).rangeRound([0, 100]);
  assert.deepStrictEqual(s.domain().map(s), [1, 34, 67]);
  assert.strictEqual(s.bandwidth(), 33);
  s.domain(["a", "b", "c", "d"]);
  assert.deepStrictEqual(s.domain().map(s), [0, 25, 50, 75]);
  assert.strictEqual(s.bandwidth(), 25);
});

test.skip("band.domain(domain) accepts an iterable", () => {
  assert.deepStrictEqual(
    scaleBand()
      .domain(new Set(["a", "b", "c"]))
      .domain(),
    ["a", "b", "c"],
  );
});

test.skip("band.domain(values) makes a copy of the specified domain values", () => {
  const domain = ["red", "green"];
  const s = scaleBand().domain(domain);
  domain.push("blue");
  assert.deepStrictEqual(s.domain(), ["red", "green"]);
});

test.skip("band.domain() returns a copy of the domain", () => {
  const s = scaleBand().domain(["red", "green"]);
  const domain = s.domain();
  assert.deepStrictEqual(domain, ["red", "green"]);
  domain.push("blue");
  assert.deepStrictEqual(s.domain(), ["red", "green"]);
});

test.skip("band.range(values) can be descending", () => {
  const s = scaleBand().domain(["a", "b", "c"]).range([120, 0]);
  assert.deepStrictEqual(s.domain().map(s), [80, 40, 0]);
  assert.strictEqual(s.bandwidth(), 40);
  s.padding(0.2);
  assert.deepStrictEqual(s.domain().map(s), [82.5, 45, 7.5]);
  assert.strictEqual(s.bandwidth(), 30);
});

test.skip("band.range(values) makes a copy of the specified range values", () => {
  const range = [1, 2];
  const s = scaleBand().range(range);
  range.push("blue");
  assert.deepStrictEqual(s.range(), [1, 2]);
});

test.skip("band.range() returns a copy of the range", () => {
  const s = scaleBand().range([1, 2]);
  const range = s.range();
  assert.deepStrictEqual(range, [1, 2]);
  range.push("blue");
  assert.deepStrictEqual(s.range(), [1, 2]);
});

test.skip("band.range(values) accepts an iterable", () => {
  const s = scaleBand().range(new Set([1, 2]));
  assert.deepStrictEqual(s.range(), [1, 2]);
});

test.skip("band.rangeRound(values) accepts an iterable", () => {
  const s = scaleBand().rangeRound(new Set([1, 2]));
  assert.deepStrictEqual(s.range(), [1, 2]);
});

test.skip("band.range(values) coerces values to numbers", () => {
  const s = scaleBand().range(["1.0", "2.0"]);
  assert.deepStrictEqual(s.range(), [1, 2]);
});

test.skip("band.rangeRound(values) coerces values to numbers", () => {
  const s = scaleBand().rangeRound(["1.0", "2.0"]);
  assert.deepStrictEqual(s.range(), [1, 2]);
});

test.skip("band.paddingInner(p) specifies the inner padding p", () => {
  const s = scaleBand().domain(["a", "b", "c"]).range([120, 0]).paddingInner(0.1).round(true);
  assert.deepStrictEqual(s.domain().map(s), [83, 42, 1]);
  assert.strictEqual(s.bandwidth(), 37);
  s.paddingInner(0.2);
  assert.deepStrictEqual(s.domain().map(s), [85, 43, 1]);
  assert.strictEqual(s.bandwidth(), 34);
});

test.skip("band.paddingInner(p) coerces p to a number <= 1", () => {
  const s = scaleBand();
  assert.strictEqual(s.paddingInner("1.0").paddingInner(), 1);
  assert.strictEqual(s.paddingInner("-1.0").paddingInner(), -1);
  assert.strictEqual(s.paddingInner("2.0").paddingInner(), 1);
  assert(Number.isNaN(s.paddingInner(NaN).paddingInner()));
});

test("band.paddingOuter(p) specifies the outer padding p", () => {
  let domain = ["a", "b", "c"];
  let n = normalizeBand(domain, 0.2, 0.1);
  // XXX this should work with reversed range
  let i = interpolateLinear(0, 120);
  let s = (x: any) => i(n(x)) | 0;
  // const s = scaleBand().domain(["a", "b", "c"]).range([120, 0]).paddingInner(0.2).paddingOuter(0.1);
  expect(i(n.width)).toEqual(32);
  expect(domain.map(s)).toEqual([4, 44, 84]);
  // s.paddingOuter(1);
  // assert.deepStrictEqual(domain.map(s), [75, 50, 25]);
  // assert.strictEqual(s.bandwidth(), 20);
});

test.skip("band.round(true) computes discrete rounded bands in a continuous range", () => {
  const s = scaleBand().domain(["a", "b", "c"]).range([0, 100]).round(true);
  assert.deepStrictEqual(s.domain().map(s), [1, 34, 67]);
  assert.strictEqual(s.bandwidth(), 33);
  s.padding(0.2);
  assert.deepStrictEqual(s.domain().map(s), [7, 38, 69]);
  assert.strictEqual(s.bandwidth(), 25);
});

test.skip("band.copy() copies all fields", () => {
  const s1 = scaleBand()
    .domain(["red", "green"])
    .range([1, 2])
    .round(true)
    .paddingInner(0.1)
    .paddingOuter(0.2);
  const s2 = s1.copy();
  assert.deepStrictEqual(s2.domain(), s1.domain());
  assert.deepStrictEqual(s2.range(), s1.range());
  assert.strictEqual(s2.round(), s1.round());
  assert.strictEqual(s2.paddingInner(), s1.paddingInner());
  assert.strictEqual(s2.paddingOuter(), s1.paddingOuter());
});

test.skip("band.copy() isolates changes to the domain", () => {
  const s1 = scaleBand().domain(["foo", "bar"]).range([0, 2]);
  const s2 = s1.copy();
  s1.domain(["red", "blue"]);
  assert.deepStrictEqual(s2.domain(), ["foo", "bar"]);
  assert.deepStrictEqual(s1.domain().map(s1), [0, 1]);
  assert.deepStrictEqual(s2.domain().map(s2), [0, 1]);
  s2.domain(["red", "blue"]);
  assert.deepStrictEqual(s1.domain(), ["red", "blue"]);
  assert.deepStrictEqual(s1.domain().map(s1), [0, 1]);
  assert.deepStrictEqual(s2.domain().map(s2), [0, 1]);
});

test.skip("band.copy() isolates changes to the range", () => {
  const s1 = scaleBand().domain(["foo", "bar"]).range([0, 2]);
  const s2 = s1.copy();
  s1.range([3, 5]);
  assert.deepStrictEqual(s2.range(), [0, 2]);
  assert.deepStrictEqual(s1.domain().map(s1), [3, 4]);
  assert.deepStrictEqual(s2.domain().map(s2), [0, 1]);
  s2.range([5, 7]);
  assert.deepStrictEqual(s1.range(), [3, 5]);
  assert.deepStrictEqual(s1.domain().map(s1), [3, 4]);
  assert.deepStrictEqual(s2.domain().map(s2), [5, 6]);
});

function assertInDelta(actual, expected, delta = 1e-6) {
  assert(inDelta(actual, expected, delta), `${actual} should be within ${delta} of ${expected}`);
}

function inDelta(actual, expected, delta) {
  return (
    Array.isArray(expected)
      ? inDeltaArray
      : typeof expected === "object"
        ? inDeltaObject
        : inDeltaNumber
  )(actual, expected, delta);
}

function inDeltaArray(actual, expected, delta) {
  let n = expected.length,
    i = -1;
  if (actual.length !== n) return false;
  while (++i < n) if (!inDelta(actual[i], expected[i], delta)) return false;
  return true;
}

function inDeltaObject(actual, expected, delta) {
  for (let i in expected) if (!inDelta(actual[i], expected[i], delta)) return false;
  for (let i in actual) if (!(i in expected)) return false;
  return true;
}

function inDeltaNumber(actual, expected, delta) {
  return actual >= expected - delta && actual <= expected + delta;
}
