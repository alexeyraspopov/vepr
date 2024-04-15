import { test } from "node:test";
import { equal, throws } from "node:assert/strict";
import { ObservableScope } from "./observable.js";

test("observable + computed", () => {
  let os = ObservableScope();

  let a = os.observable(0);
  let b = os.computed(() => a() * 2);
  let c = os.computed(() => a() + b());

  equal(a(), 0);
  equal(b(), 0);
  equal(c(), 0);

  a(10);

  equal(a(), 10);
  equal(b(), 20);
  equal(c(), 30);
});

test("computed as derived", () => {
  let os = ObservableScope();

  let a = os.observable(0);
  let b = os.computed(() => a() * 2);
  let c = os.computed(() => a() + b());

  equal(a(), 0);
  equal(b(), 0);
  equal(c(), 0);

  b(10);

  equal(b(), 10);
  equal(c(), 10);

  a(20);

  equal(a(), 20);
  equal(b(), 40);
  equal(c(), 60);
});

test("observe + watch", () => {
  let os = ObservableScope();
  let et = new EventTarget();

  let source = 0;
  let a = os.observe(
    () => source,
    (cb) => {
      et.addEventListener("update", cb);
      return () => et.removeEventListener("update", cb);
    },
  );

  equal(a(), 0);

  let received;
  let cleared = 0;
  let b = os.watch(() => {
    received = a();
    return () => {
      cleared++;
    };
  });
  let c = os.computed(() => a());

  equal(received, 0);

  source = 13;
  et.dispatchEvent(new Event("update"));

  equal(a(), 13);
  equal(received, 13);
  equal(c(), 13);
  equal(cleared, 1);

  b();

  source = 100;
  et.dispatchEvent(new Event("update"));

  equal(a(), 100);
  equal(received, 13);
  equal(c(), 100);
  equal(cleared, 2);

  os.dispose();

  source = 200;
  et.dispatchEvent(new Event("update"));

  equal(a(), 100);
  equal(received, 13);
  equal(c(), 100);
  equal(cleared, 2);
});

test("prevent write during read", () => {
  let os = ObservableScope();
  let a = os.observable(0);
  let b = os.computed(() => a() * 2);
  throws(() => os.computed(() => a(123)), { message: /prohibited/ });
  throws(() => os.watch(() => a(123)), { message: /prohibited/ });
  throws(() => os.watch(() => b(123)), { message: /prohibited/ });
});
