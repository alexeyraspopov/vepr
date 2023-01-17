import { test, expect } from "vitest";
import {
  Ordinal,
  Threshold,
  Quantile,
  Quantize,
  Diverging,
  Track,
  SequentialQuantile,
  Sequential,
  SequentialBand,
} from "./scale.js";
import { InterpolateRange, log, pow, symlog } from "./number.js";
import { identity, linearTicks } from "./array.js";

test("basic interpolation", () => {
  let scale = Sequential([0, 10], InterpolateRange([-10, 10]));
  expect(scale(5)).toEqual(0);
});

test("log", () => {
  let scaleA = Sequential([1e-15, 1e20], identity, log(10));
  expect(scaleA(1e18)).toEqual(0.9428571428571428);
  expect(scaleA(1e13)).toEqual(0.8);
  expect(scaleA(1e9)).toEqual(0.6857142857142857);
  expect(scaleA(1e6)).toEqual(0.6);
  expect(scaleA(1e3)).toEqual(0.5142857142857142);
  expect(scaleA(75)).toEqual(0.48214460752547716);
  expect(scaleA(1e-3)).toEqual(0.34285714285714286);
  expect(scaleA(1e-8)).toEqual(0.2);
  expect(scaleA(1e-12)).toEqual(0.08571428571428572);
  expect(scaleA(1e-15)).toEqual(0);

  let scaleB = Sequential([1, 10], identity, log(2));
  expect(scaleB(1)).toEqual(0);
  expect(scaleB(2.5)).toEqual(0.39794000867203766);
  expect(scaleB(5)).toEqual(0.6989700043360187);
  expect(scaleB(7.5)).toEqual(0.8750612633917001);
  expect(scaleB(10)).toEqual(1);

  let scaleC = Sequential([1, 10], identity, log(7));
  expect(scaleC(1)).toEqual(0);
  expect(scaleC(2.5)).toEqual(0.39794000867203755);
  expect(scaleC(5)).toEqual(0.6989700043360187);
  expect(scaleC(7.5)).toEqual(0.8750612633916999);
  expect(scaleC(10)).toEqual(1);
});

test("pow", () => {
  let scale = Sequential([1, 10], identity, pow(2));
  expect(scale(1)).toEqual(0);
  expect(scale(2.5)).toEqual(0.05303030303030303);
  expect(scale(5)).toEqual(0.24242424242424243);
  expect(scale(7.5)).toEqual(0.5580808080808081);
  expect(scale(10)).toEqual(1);
});

test("symlog", () => {
  let scale = Sequential([1, 10], identity, symlog(5));
  expect(scale(1)).toEqual(0);
  expect(scale(2.5)).toEqual(0.24352920263397002);
  expect(scale(5)).toEqual(0.5574929506502402);
  expect(scale(7.5)).toEqual(0.8010221532842102);
  expect(scale(10)).toEqual(1);
});

test("basic ordinal mapping", () => {
  let scale = Ordinal(["a", "b", "c"], [-1, 0, 1]);
  expect(scale("a")).toEqual(-1);
  expect(scale("b")).toEqual(0);
  expect(scale("c")).toEqual(1);
  expect(scale("d")).toEqual(undefined);
});

test("threshold", () => {
  let scale = Threshold([1 / 3, 2 / 3], ["a", "b", "c"]);
  expect(scale(0)).toEqual("a");
  expect(scale(0.2)).toEqual("a");
  expect(scale(0.4)).toEqual("b");
  expect(scale(0.6)).toEqual("b");
  expect(scale(0.8)).toEqual("c");
  expect(scale(1)).toEqual("c");
});

test("quantile", () => {
  let scaleA = Quantile([3, 6, 7, 8, 8, 10, 13, 15, 16, 20], [0, 1, 2, 3]);
  expect([3, 6, 6.9, 7, 7.1].map((v) => scaleA(v))).toEqual([0, 0, 0, 0, 0]);
  expect([8, 8.9].map((v) => scaleA(v))).toEqual([1, 1]);
  expect([9, 9.1, 10, 13].map((v) => scaleA(v))).toEqual([2, 2, 2, 2]);
  expect([14.9, 15, 15.1, 16, 20].map((v) => scaleA(v))).toEqual([3, 3, 3, 3, 3]);

  let scaleB = Quantile([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], [0, 1, 2, 3]);
  expect([3, 6, 6.9, 7, 7.1].map((v) => scaleB(v))).toEqual([0, 0, 0, 0, 0]);
  expect([8, 8.9].map((v) => scaleB(v))).toEqual([1, 1]);
  expect([9, 9.1, 10, 13].map((v) => scaleB(v))).toEqual([2, 2, 2, 2]);
  expect([14.9, 15, 15.1, 16, 20].map((v) => scaleB(v))).toEqual([3, 3, 3, 3, 3]);
});

test("sequential quantile", () => {
  let scale = SequentialQuantile([100, 1, 13], (v) => v);
  expect([1, 2, 13, 20, 99.99, 100].map((v) => scale(v))).toEqual([0, 0, 0.5, 0.5, 0.5, 1]);
});

test("quantize", () => {
  let scaleA = Quantize([10, 100], [1, 2, 4]);
  expect(scaleA(20)).toEqual(1);
  expect(scaleA(50)).toEqual(2);
  expect(scaleA(80)).toEqual(4);
});

test("diverging", () => {
  let scaleA = Diverging([0, 0.5, 1], (t) => t);
  expect(scaleA(0)).toEqual(0);
  expect(scaleA(0.5)).toEqual(0.5);
  expect(scaleA(0.75)).toEqual(0.75);

  let scaleB = Diverging([-1.2, 0, 2.4], (t) => String(t));
  expect(scaleB(-1.2)).toEqual("0");
  expect(scaleB(0.6)).toEqual("0.625");
  expect(scaleB(2.4)).toEqual("1");
});

test("band", () => {
  let scaleA = SequentialBand(["a", "b", "c", "d"], InterpolateRange([0, 600]));
  expect(scaleA("a")).toEqual(0);
  expect(scaleA("b")).toEqual(150);
  expect(scaleA("c")).toEqual(300);
  expect(scaleA("d")).toEqual(450);
  expect(scaleA("e")).toEqual(undefined);

  let scaleB = SequentialBand(["a", "b", "c"], InterpolateRange([0, 400]), 0.5);
  expect(scaleB("a")).toEqual(0);
  expect(scaleB("b")).toEqual(160);
  expect(scaleB("c")).toEqual(320);

  let scaleC = SequentialBand(["a", "b", "c"], InterpolateRange([0, 300]), 0.5, 0.25);
  expect(scaleC("a")).toEqual(25);
  expect(scaleC("b")).toEqual(125);
  expect(scaleC("c")).toEqual(225);

  let scaleD = SequentialBand(["a", "b", "c"], InterpolateRange([0, 300]), 0.5, 0.25, 0);
  expect(scaleD("a")).toEqual(0);
  expect(scaleD("b")).toEqual(100);
  expect(scaleD("c")).toEqual(200);

  let scaleE = SequentialBand(["a", "b", "c"], InterpolateRange([0, 300]), 0.5, 0.25, 1);
  expect(scaleE("a")).toEqual(50);
  expect(scaleE("b")).toEqual(150);
  expect(scaleE("c")).toEqual(250);
});

test("track", () => {
  let scaleA = Track(["1f", "1f", "1f"], 300);
  expect(scaleA(0)).toEqual([0, 0 + 100]);
  expect(scaleA(1)).toEqual([100, 100 + 100]);
  expect(scaleA(2)).toEqual([200, 200 + 100]);
  expect(scaleA(0, 2)).toEqual([0, 0 + 200]);
  expect(scaleA(1, 2)).toEqual([100, 100 + 200]);

  let scaleB = Track(["1f", "1f", "1f"], 300, 4);
  expect(scaleB(0)).toEqual([4, 4 + 97.33333333333333]);
  expect(scaleB(1)).toEqual([101.33333333333333, 101.33333333333333 + 97.33333333333333]);
  expect(scaleB(2)).toEqual([198.66666666666666, 198.66666666666666 + 97.33333333333333]);
  expect(scaleB(0, 2)).toEqual([4, 4 + 194.66666666666666]);
  expect(scaleB(1, 2)).toEqual([101.33333333333333, 101.33333333333333 + 194.66666666666666]);

  let scaleC = Track(["1f", "1f", "1f"], 300, 4, 2);
  expect(scaleC(0)).toEqual([4, 4 + 96]);
  expect(scaleC(1)).toEqual([102, 102 + 96]);
  expect(scaleC(2)).toEqual([200, 200 + 96]);
  expect(scaleC(0, 2)).toEqual([4, 4 + 194]);
  expect(scaleC(1, 2)).toEqual([102, 102 + 194]);

  let scaleD = Track(["20u", "1f", "2f"], 512, 4, 2);
  expect(scaleD(1, 2)).toEqual([26, 26 + 482]);
  expect(scaleD(0, 1)).toEqual([4, 4 + 20]);

  let scaleE = Track(["20u", "1f", "2f", "30%"], 512, 4, 2);
  expect(scaleE(1, 2)).toEqual([26, 26 + 328.8]);
  expect(scaleE(3, 1)).toEqual([356.8, 356.8 + 151.2]);
});

test("ticks", () => {
  expect(linearTicks(0, 1, 10)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  expect(linearTicks(0, 1, 9)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  expect(linearTicks(0, 1, 8)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  expect(linearTicks(0, 1, 7)).toEqual([0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);
  expect(linearTicks(0, 1, 6)).toEqual([0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);
  expect(linearTicks(0, 1, 5)).toEqual([0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);
  expect(linearTicks(0, 1, 4)).toEqual([0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);
  expect(linearTicks(0, 1, 3)).toEqual([0.0, 0.5, 1.0]);
  expect(linearTicks(0, 1, 2)).toEqual([0.0, 0.5, 1.0]);
  expect(linearTicks(0, 1, 1)).toEqual([0.0, 1.0]);
  expect(linearTicks(0, 10, 10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  expect(linearTicks(0, 10, 9)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  expect(linearTicks(0, 10, 8)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  expect(linearTicks(0, 10, 7)).toEqual([0, 2, 4, 6, 8, 10]);
  expect(linearTicks(0, 10, 6)).toEqual([0, 2, 4, 6, 8, 10]);
  expect(linearTicks(0, 10, 5)).toEqual([0, 2, 4, 6, 8, 10]);
  expect(linearTicks(0, 10, 4)).toEqual([0, 2, 4, 6, 8, 10]);
  expect(linearTicks(0, 10, 3)).toEqual([0, 5, 10]);
  expect(linearTicks(0, 10, 2)).toEqual([0, 5, 10]);
  expect(linearTicks(0, 10, 1)).toEqual([0, 10]);
  expect(linearTicks(-10, 10, 10)).toEqual([-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  expect(linearTicks(-10, 10, 9)).toEqual([-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  expect(linearTicks(-10, 10, 8)).toEqual([-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  expect(linearTicks(-10, 10, 7)).toEqual([-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  expect(linearTicks(-10, 10, 6)).toEqual([-10, -5, 0, 5, 10]);
  expect(linearTicks(-10, 10, 5)).toEqual([-10, -5, 0, 5, 10]);
  expect(linearTicks(-10, 10, 4)).toEqual([-10, -5, 0, 5, 10]);
  expect(linearTicks(-10, 10, 3)).toEqual([-10, -5, 0, 5, 10]);
  expect(linearTicks(-10, 10, 2)).toEqual([-10, 0, 10]);
  expect(linearTicks(-10, 10, 1)).toEqual([-20, 0, 20]);
});

test("ticks reversed", () => {
  expect(linearTicks(8.5, 0.65, 100)).toEqual(
    [
      0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4,
      2.5, 2.6, 2.7, 2.8, 2.9, 3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4, 4.1, 4.2, 4.3,
      4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6, 6.1, 6.2,
      6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8, 8.1,
      8.2, 8.3, 8.4, 8.5,
    ].reverse(),
  );

  expect(linearTicks(8.65, 0.65, 50)).toEqual(
    [
      0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.2, 4.4,
      4.6, 4.8, 5, 5.2, 5.4, 5.6, 5.8, 6, 6.2, 6.4, 6.6, 6.8, 7, 7.2, 7.4, 7.6, 7.8, 8, 8.2, 8.4,
      8.6, 8.8,
    ].reverse(),
  );

  expect(linearTicks(8.65, 0.65, 25)).toEqual(
    [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].reverse(),
  );

  expect(linearTicks(8.65, 0.65, 10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].reverse());
});
