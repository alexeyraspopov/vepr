import { test, expect } from "vitest";
import { descending } from "../scale/array.js";
import { identity_new as identity } from "./identity.js";

test("identity transform", () => {
  type Datum = { name: string; age: number };
  let sample = [
    { name: "Liza", age: 27 },
    { name: "Ann", age: 24 },
  ];

  let channels = identity<Datum>({ x: "age", y: "name" })(sample);

  expect(channels).toEqual({
    index: Uint32Array.from([0, 1]),
    bitset: Uint32Array.of(0xffffffff),
    x: [27, 24],
    y: ["Liza", "Ann"],
  });
});

test("identity filter transform", () => {
  type Datum = { key: string; freq: number; flag: boolean };
  let sample = [
    { key: "a", freq: 42, flag: true },
    { key: "b", freq: 30, flag: true },
    { key: "c", freq: 60, flag: true },
  ];

  let channels = identity<Datum>({ x: "freq", y: "key" }, { filter: (d) => d.freq > 40 })(sample);

  expect(channels).toEqual({
    index: Uint32Array.from([0, 1, 2]),
    bitset: Uint32Array.of(0b101 << 29),
    x: [42, 30, 60],
    y: ["a", "b", "c"],
  });
});

test("identity filter sort transform", () => {
  type Datum = { key: string; freq: number; flag: boolean };
  let sample = [
    { key: "a", freq: 42, flag: true },
    { key: "b", freq: 30, flag: false },
    { key: "c", freq: 60, flag: true },
  ];

  let channels = identity<Datum>(
    { x: "freq", y: "key" },
    { filter: (d) => d.flag, sort: (a, b) => descending(a.freq, b.freq) },
  )(sample);

  expect(channels).toEqual({
    index: Uint32Array.from([2, 0, 1]),
    bitset: Uint32Array.of(0b101 << 29),
    x: [60, 42, 30],
    y: ["c", "a", "b"],
  });
});

test("identity filter reverse transform", () => {
  type Datum = { a: number; b: string };
  let sample = [
    { a: 1, b: "o" },
    { a: 2, b: "oo" },
    { a: 3, b: "ooo" },
  ];

  let channels = identity<Datum>(
    { x: "b", y: "a" },
    { filter: (d) => d.a > 1, reverse: true },
  )(sample);

  expect(channels).toEqual({
    index: Uint32Array.from([2, 1, 0]),
    bitset: Uint32Array.of(0b011 << 29),
    x: ["ooo", "oo", "o"],
    y: [3, 2, 1],
  });
});
