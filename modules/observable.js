const PROVIDER = 0b001;
const CONSUMER = 0b010;
const DISPOSER = 0b100;

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
   * @param {(cb: () => void) => () => void} subscribe
   * @param {() => T} get
   * @returns {() => T}
   */
  function observe(subscribe, get) {
    let value = get();

    let clear = subscribe(() => {
      let val = get();
      let changed = !Object.is(val, value);
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
   * @returns {(() => T) & ((value: T) => void)}
   */
  function observable(value) {
    let node = { flag: PROVIDER, prev: tail.prev, next: tail };
    tail.prev = tail.prev.next = node;

    return (val) => {
      if (typeof val === "undefined") {
        if (tracked != null) tracked.add(node);
        return value;
      } else {
        if (tracked != null || marked != null) throw new Error("write while read is prohibited");
        let changed = !Object.is(val, value);
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
   * @param {() => T} fn
   * @returns {(() => T) & ((value: T) => void)}
   */
  function computed(fn) {
    tracked = new WeakSet();
    let value = fn();
    let update = () => {
      let val = fn();
      let changed = !Object.is(val, value);
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
        let changed = !Object.is(val, value);
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
   * @param {() => (void | () => void)} fn
   * @returns {() => void}
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
   * @returns {() => void}
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
