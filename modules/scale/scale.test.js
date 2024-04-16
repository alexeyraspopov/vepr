import { test } from "node:test";
import { deepEqual } from "node:assert/strict";
import { track } from "./scale.js";
import { linearTicks } from "./array.js";

test("track", () => {
  let scaleA = track(["1f", "1f", "1f"], 300);
  deepEqual(scaleA(0), [0, 0 + 100]);
  deepEqual(scaleA(1), [100, 100 + 100]);
  deepEqual(scaleA(2), [200, 200 + 100]);
  deepEqual(scaleA(0, 2), [0, 0 + 200]);
  deepEqual(scaleA(1, 2), [100, 100 + 200]);

  let scaleB = track(["1f", "1f", "1f"], 300, 4);
  deepEqual(scaleB(0), [4, 4 + 97.33333333333333]);
  deepEqual(scaleB(1), [101.33333333333333, 101.33333333333333 + 97.33333333333333]);
  deepEqual(scaleB(2), [198.66666666666666, 198.66666666666666 + 97.33333333333333]);
  deepEqual(scaleB(0, 2), [4, 4 + 194.66666666666666]);
  deepEqual(scaleB(1, 2), [101.33333333333333, 101.33333333333333 + 194.66666666666666]);

  let scaleC = track(["1f", "1f", "1f"], 300, 4, 2);
  deepEqual(scaleC(0), [4, 4 + 96]);
  deepEqual(scaleC(1), [102, 102 + 96]);
  deepEqual(scaleC(2), [200, 200 + 96]);
  deepEqual(scaleC(0, 2), [4, 4 + 194]);
  deepEqual(scaleC(1, 2), [102, 102 + 194]);

  let scaleD = track(["20u", "1f", "2f"], 512, 4, 2);
  deepEqual(scaleD(1, 2), [26, 26 + 482]);
  deepEqual(scaleD(0, 1), [4, 4 + 20]);

  let scaleE = track(["20u", "1f", "2f", "30%"], 512, 4, 2);
  deepEqual(scaleE(1, 2), [26, 26 + 328.8]);
  deepEqual(scaleE(3, 1), [356.8, 356.8 + 151.2]);
});

test("ticks", () => {
  deepEqual(linearTicks(0, 1, 10), [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  deepEqual(linearTicks(0, 1, 9), [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  deepEqual(linearTicks(0, 1, 8), [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  deepEqual(linearTicks(0, 1, 7), [0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);
  deepEqual(linearTicks(0, 1, 6), [0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);
  deepEqual(linearTicks(0, 1, 5), [0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);
  deepEqual(linearTicks(0, 1, 4), [0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);
  deepEqual(linearTicks(0, 1, 3), [0.0, 0.5, 1.0]);
  deepEqual(linearTicks(0, 1, 2), [0.0, 0.5, 1.0]);
  deepEqual(linearTicks(0, 1, 1), [0.0, 1.0]);
  deepEqual(linearTicks(0, 10, 10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  deepEqual(linearTicks(0, 10, 9), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  deepEqual(linearTicks(0, 10, 8), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  deepEqual(linearTicks(0, 10, 7), [0, 2, 4, 6, 8, 10]);
  deepEqual(linearTicks(0, 10, 6), [0, 2, 4, 6, 8, 10]);
  deepEqual(linearTicks(0, 10, 5), [0, 2, 4, 6, 8, 10]);
  deepEqual(linearTicks(0, 10, 4), [0, 2, 4, 6, 8, 10]);
  deepEqual(linearTicks(0, 10, 3), [0, 5, 10]);
  deepEqual(linearTicks(0, 10, 2), [0, 5, 10]);
  deepEqual(linearTicks(0, 10, 1), [0, 10]);
  deepEqual(linearTicks(-10, 10, 10), [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  deepEqual(linearTicks(-10, 10, 9), [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  deepEqual(linearTicks(-10, 10, 8), [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  deepEqual(linearTicks(-10, 10, 7), [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  deepEqual(linearTicks(-10, 10, 6), [-10, -5, 0, 5, 10]);
  deepEqual(linearTicks(-10, 10, 5), [-10, -5, 0, 5, 10]);
  deepEqual(linearTicks(-10, 10, 4), [-10, -5, 0, 5, 10]);
  deepEqual(linearTicks(-10, 10, 3), [-10, -5, 0, 5, 10]);
  deepEqual(linearTicks(-10, 10, 2), [-10, 0, 10]);
  deepEqual(linearTicks(-10, 10, 1), [-20, 0, 20]);
});

test("ticks reversed", () => {
  deepEqual(
    linearTicks(8.5, 0.65, 100),
    [
      0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4,
      2.5, 2.6, 2.7, 2.8, 2.9, 3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4, 4.1, 4.2, 4.3,
      4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6, 6.1, 6.2,
      6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8, 8.1,
      8.2, 8.3, 8.4, 8.5,
    ].reverse(),
  );

  deepEqual(
    linearTicks(8.65, 0.65, 50),
    [
      0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.2, 4.4,
      4.6, 4.8, 5, 5.2, 5.4, 5.6, 5.8, 6, 6.2, 6.4, 6.6, 6.8, 7, 7.2, 7.4, 7.6, 7.8, 8, 8.2, 8.4,
      8.6, 8.8,
    ].reverse(),
  );

  deepEqual(
    linearTicks(8.65, 0.65, 25),
    [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].reverse(),
  );

  deepEqual(linearTicks(8.65, 0.65, 10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].reverse());
});
