export function Scope() {
  let head = { prev: null, next: null };
  let tail = { prev: null, next: null };
  head.next = tail;
  tail.prev = head;

  let tracked = null;
  let marked = null;

  /** Provide an observable that reads from external source */
  function observe(subscribe, get) {
    let value = get();

    let clear = subscribe(() => {
      let val = get();
      let changed = val !== value;
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
      node.prev.next = node.next;
      node.next.prev = node.prev;
    };

    let node = { dispose, prev: tail.prev, next: tail };
    tail.prev.next = node;
    tail.prev = node;

    return () => {
      if (tracked != null) tracked.add(node);
      return value;
    };
  }

  /** Basic read/write observable atom */
  function observable(value) {
    let node = { prev: tail.prev, next: tail };
    tail.prev.next = node;
    tail.prev = node;

    return (val) => {
      if (typeof val === "undefined") {
        if (tracked != null) tracked.add(node);
        return value;
      } else {
        if (tracked != null || marked != null) throw new Error("write while read is prohibited");
        let changed = val !== value;
        value = val;
        if (changed) {
          marked = [node];
          digest();
        }
      }
    };
  }

  /** Computed value that also works as derived atom */
  function computed(fn) {
    tracked = new WeakSet();
    let value = fn();
    let update = () => {
      let val = fn();
      let changed = val !== value;
      value = val;
      if (changed) {
        marked.push(node);
      }
    };
    let node = { deps: tracked, update, prev: tail.prev, next: tail };
    tail.prev.next = node;
    tail.prev = node;
    tracked = null;

    return (val) => {
      if (typeof val === "undefined") {
        if (tracked != null) tracked.add(node);
        return value;
      } else {
        if (tracked != null || marked != null) throw new Error("write while read is prohibited");
        let changed = val !== value;
        value = val;
        if (changed) {
          marked = [node];
          digest();
        }
      }
    };
  }

  /** Observable watcher for side effects */
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
      node.prev.next = node.next;
      node.next.prev = node.prev;
    };
    let node = { deps: tracked, update, dispose, prev: tail.prev, next: tail };
    tail.prev.next = node;
    tail.prev = node;
    tracked = null;
    return dispose;
  }

  function digest() {
    let cursor = marked[0];
    while ((cursor = cursor.next) !== tail) {
      if (cursor.deps != null && marked.some((node) => cursor.deps.has(node))) {
        cursor.update();
      }
    }
    marked = null;
  }

  function dispose() {
    let cursor = head;
    while ((cursor = cursor.next) !== tail) {
      if (cursor.dispose != null) cursor.dispose();
    }
    head = { prev: null, next: null };
    tail = { prev: null, next: null };
  }

  return { observe, observable, computed, watch, dispose };
}
