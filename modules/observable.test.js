import { test, expect } from "vitest";
import { Scope } from "./observable";

test("observable + computed", () => {
  let ko = Scope();

  let a = ko.observable(0);
  let b = ko.computed(() => a() * 2);
  let c = ko.computed(() => a() + b());

  expect(a()).toEqual(0);
  expect(b()).toEqual(0);
  expect(c()).toEqual(0);

  a(10);

  expect(a()).toEqual(10);
  expect(b()).toEqual(20);
  expect(c()).toEqual(30);
});

test("computed as derived", () => {
  let ko = Scope();

  let a = ko.observable(0);
  let b = ko.computed(() => a() * 2);
  let c = ko.computed(() => a() + b());

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
  let ko = Scope();
  let et = new EventTarget();

  let source = 0;
  let a = ko.observe(
    (cb) => {
      et.addEventListener("update", cb);
      return () => et.removeEventListener("update", cb);
    },
    () => source,
  );

  expect(a()).toEqual(0);

  let received;
  let cleared = 0;
  let b = ko.watch(() => {
    received = a();
    return () => {
      cleared++;
    };
  });
  let c = ko.computed(() => a());

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

  ko.dispose();

  source = 200;
  et.dispatchEvent(new Event("update"));

  expect(a()).toEqual(100);
  expect(received).toEqual(13);
  expect(c()).toEqual(100);
  expect(cleared).toEqual(2);
});
