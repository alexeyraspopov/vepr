const PROVIDER = 0b001;
const CONSUMER = 0b010;
const DISPOSER = 0b100;

/** @typedef {ReturnType<typeof ObservableContext>} ObservableContext */
/**
 * @template T
 * @typedef {(() => T) & ((value: T) => void)} Observable
 */

/**
 * Creates isolated scope of observable values and its consumers.
 *
 * @example
 *   let co = ObservableContext();
 *   let counter = co.observable(0);
 *   let double = co.computed(() => counter() * 2);
 *
 *   let dispose = co.watch(() => {
 *     let value = double();
 *     console.log(value);
 *   });
 *
 *   counter(counter() + 1); // prints 2 in the console
 */
export function ObservableContext() {
  let head = { prev: null, next: null };
  let tail = { prev: null, next: null };
  (head.next = tail).prev = head;

  let tracked = null;
  let marked = null;

  /**
   * Provide an observable that reads from external source
   *
   * @template T
   * @param {() => T} get
   * @param {(cb: () => void) => () => void} subscribe
   * @param {(a: T, b: T) => boolean} [equals=Object.is] Default is `Object.is`
   * @returns {() => T}
   */
  function observe(get, subscribe, equals = Object.is) {
    let value = get();

    let clear = subscribe(() => {
      let val = get();
      let changed = !equals(val, value);
      value = val;
      if (changed) {
        marked = [node];
        digest();
      }
    });

    let dispose = () => {
      if (typeof clear === "function") {
        clear();
        clear = null;
      }
      (node.prev.next = node.next).prev = node.prev;
    };

    let node = { flag: PROVIDER + DISPOSER, dispose, prev: tail.prev, next: tail };
    tail.prev = tail.prev.next = node;

    return () => {
      if (tracked != null) tracked.add(node);
      return value;
    };
  }

  /**
   * Basic read/write observable atom
   *
   * @template T
   * @param {T} value
   * @param {(a: T, b: T) => boolean} [equals=Object.is] Default is `Object.is`
   * @returns {Observable<T>}
   */
  function observable(value, equals = Object.is) {
    let node = { flag: PROVIDER, prev: tail.prev, next: tail };
    tail.prev = tail.prev.next = node;

    return (val) => {
      if (typeof val === "undefined") {
        if (tracked != null) tracked.add(node);
        return value;
      } else {
        if (tracked != null || marked != null) throw new Error("write while read is prohibited");
        let changed = !equals(val, value);
        value = val;
        if (changed) {
          marked = [node];
          digest();
        }
      }
    };
  }

  /**
   * Computed value that also works as derived atom
   *
   * @template T
   * @param {() => T} get
   * @param {(a: T, b: T) => boolean} [equals=Object.is] Default is `Object.is`
   * @returns {Observable<T>}
   */
  function computed(get, equals = Object.is) {
    tracked = new WeakSet();
    let value = get();
    let update = () => {
      let val = get();
      let changed = !equals(val, value);
      value = val;
      if (changed) {
        marked.push(node);
      }
    };
    let node = { flag: PROVIDER + CONSUMER, tracked, update, prev: tail.prev, next: tail };
    tail.prev = tail.prev.next = node;
    tracked = null;

    return (val) => {
      if (typeof val === "undefined") {
        if (tracked != null) tracked.add(node);
        return value;
      } else {
        if (tracked != null || marked != null) throw new Error("write while read is prohibited");
        let changed = !equals(val, value);
        value = val;
        if (changed) {
          marked = [node];
          digest();
        }
      }
    };
  }

  /**
   * Observable watcher for side effects
   *
   * @param {() => (() => void) | void)} fn
   * @returns {() => void} A function to cleanup and dispose the watcher
   */
  function watch(fn) {
    tracked = new WeakSet();
    let clear = fn();
    let update = () => {
      if (typeof clear === "function") clear();
      clear = fn();
    };
    let dispose = () => {
      if (typeof clear === "function") {
        clear();
        clear = null;
      }
      (node.prev.next = node.next).prev = node.prev;
    };
    let node = { flag: CONSUMER + DISPOSER, tracked, update, dispose, prev: tail.prev, next: tail };
    tail.prev = tail.prev.next = node;
    tracked = null;
    return dispose;
  }

  function digest() {
    let cursor = marked[0];
    while ((cursor = cursor.next) !== tail) {
      if (cursor.flag & CONSUMER && marked.some((node) => cursor.tracked.has(node))) {
        cursor.update();
      }
    }
    marked = null;
  }

  /**
   * Clean up the context
   *
   * @returns {void}
   */
  function dispose() {
    let cursor = head;
    while ((cursor = cursor.next) !== tail) {
      if (cursor.flag & DISPOSER) cursor.dispose();
    }
    head = { prev: null, next: null };
    tail = { prev: null, next: null };
    (head.next = tail).prev = head;
  }

  return { observe, observable, computed, watch, dispose };
}
