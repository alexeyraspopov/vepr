import { test, expect } from "vitest";
import { brush } from "./interaction.js";

test("brush", () => {
  let ctl = brush("xy");
  ctl.extent([
    [0, 0],
    [200, 100],
  ]);

  expect(ctl.get()).toEqual(undefined);

  ctl.down(10, 10);
  ctl.move(40, 40);
  ctl.move(60, 30);
  ctl.up();

  expect(ctl.get()).toEqual([
    [10, 10],
    [60, 30],
  ]);

  ctl.down(70, 80);
  ctl.move(5, 5);
  ctl.up();

  expect(ctl.get()).toEqual([
    [5, 5],
    [70, 80],
  ]);

  ctl.down(20, 20);
  ctl.move(25, 25);
  ctl.up();

  expect(ctl.get()).toEqual([
    [10, 10],
    [75, 85],
  ]);
});
