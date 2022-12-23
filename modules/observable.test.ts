import { test, expect } from "vitest";
import { ObservableContext } from "./observable";

test("observable + computed", () => {
  let co = ObservableContext();

  let a = co.observable(0);
  let b = co.computed(() => a() * 2);
  let c = co.computed(() => a() + b());

  expect(a()).toEqual(0);
  expect(b()).toEqual(0);
  expect(c()).toEqual(0);

  a(10);

  expect(a()).toEqual(10);
  expect(b()).toEqual(20);
  expect(c()).toEqual(30);
});

test("computed as derived", () => {
  let co = ObservableContext();

  let a = co.observable(0);
  let b = co.computed(() => a() * 2);
  let c = co.computed(() => a() + b());

  expect(a()).toEqual(0);
  expect(b()).toEqual(0);
  expect(c()).toEqual(0);

  b(10);

  expect(b()).toEqual(10);
  expect(c()).toEqual(10);

  a(20);

  expect(a()).toEqual(20);
  expect(b()).toEqual(40);
  expect(c()).toEqual(60);
});

test("observe + watch", () => {
  let co = ObservableContext();
  let et = new EventTarget();

  let source = 0;
  let a = co.observe(
    () => source,
    (cb) => {
      et.addEventListener("update", cb);
      return () => et.removeEventListener("update", cb);
    },
  );

  expect(a()).toEqual(0);

  let received;
  let cleared = 0;
  let b = co.watch(() => {
    received = a();
    return () => {
      cleared++;
    };
  });
  let c = co.computed(() => a());

  expect(received).toEqual(0);

  source = 13;
  et.dispatchEvent(new Event("update"));

  expect(a()).toEqual(13);
  expect(received).toEqual(13);
  expect(c()).toEqual(13);
  expect(cleared).toEqual(1);

  b();

  source = 100;
  et.dispatchEvent(new Event("update"));

  expect(a()).toEqual(100);
  expect(received).toEqual(13);
  expect(c()).toEqual(100);
  expect(cleared).toEqual(2);

  co.dispose();

  source = 200;
  et.dispatchEvent(new Event("update"));

  expect(a()).toEqual(100);
  expect(received).toEqual(13);
  expect(c()).toEqual(100);
  expect(cleared).toEqual(2);
});

test("prevent write during read", () => {
  let co = ObservableContext();

  let a = co.observable(0);
  expect(() => co.computed(() => a(123))).toThrow(/prohibited/);
  expect(() => co.watch(() => a(123))).toThrow(/prohibited/);
});
