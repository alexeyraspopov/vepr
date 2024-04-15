import { test } from "node:test";
import { equal } from "node:assert/strict";
import { medianAbsoluteDeviation, interQuartileRange } from "./quantile.js";

test("MAD", () => {
  equal(medianAbsoluteDeviation([1, 1, 2, 2, 4, 6, 9]), 1);
});

test("IQR", () => {
  equal(interQuartileRange([7, 7, 31, 31, 47, 75, 87, 115, 116, 119, 119, 155, 177]), 88);
});
