import { identity } from "./scale/array";

/**
 * @template T
 * @param {T[] | object} data
 * @param {{
 *   x?: (value: T) => number;
 *   y?: (value: T) => number;
 *   r?: (value: T) => number;
 * }} transform
 */
export function dot(data, transform) {
  function snapshot() {
    if (!isArrayLike(data)) return data;
    let { x, y, r } = transform;
    return {
      key: "dot",
      index: Uint32Array.from(data, (_, i) => i),
      x: apply(x, data, Float64Array),
      y: apply(y, data, Float64Array),
      r: apply(r, data, Float64Array),
    };
  }

  function channels(input) {
    let { x, y, r } = transform;
    if (isArrayLike(input)) return { series: input, x, y, r };
    return {
      series: input.index,
      x: vector(x, input.x),
      y: vector(y, input.y),
      r: input.r != null ? vector(identity, input.r) : constant(3),
    };
  }

  /** @param {CanvasRenderingContext2D} context */
  function render(context) {
    let { series, x, y, r } = channels(data);
    let tau = 2 * Math.PI;

    context.lineWidth = 1.5;
    context.strokeStyle = "currentColor";
    for (let item of series) {
      context.beginPath();
      context.arc(x(item), y(item), r(item), 0, tau, false);
      context.stroke();
    }
  }

  return { render, snapshot };
}

export function line(data, transform) {
  function snapshot() {
    if (!isArrayLike(data)) return data;
    let { x, y } = transform;
    return {
      key: "line",
      index: Uint32Array.from(data, (_, i) => i),
      x: apply(x, data, Float64Array),
      y: apply(y, data, Float64Array),
    };
  }

  function channels(input) {
    let { x, y } = transform;
    if (isArrayLike(input)) return { series: input, x, y };
    return {
      series: input.index,
      x: vector(x, input.x),
      y: vector(y, input.y),
    };
  }

  /** @param {CanvasRenderingContext2D} context */
  function render(context) {
    let { series, x, y } = channels(data);

    let path = new Path2D();

    let lx, ly;
    let moving = true;
    for (let item of series) {
      lx = x(item);
      ly = y(item);
      if (Number.isNaN(lx) || Number.isNaN(ly)) {
        moving = true;
      } else {
        if (moving) path.moveTo(lx, ly);
        else path.lineTo(lx, ly);
        moving = false;
      }
    }

    context.beginPath();
    context.lineWidth = 1.5;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.miterLimit = 1;
    context.strokeStyle = "currentColor";
    context.stroke(path);
  }

  return { render, snapshot };
}

export function rect(data, transform) {
  function snapshot() {
    if (!isArrayLike(data)) return data;
    let { x, y, x1 = x, x2 = x, y1 = y, y2 = y, alpha } = transform;
    return {
      key: "rect",
      index: Uint32Array.from(data, (_, i) => i),
      x1: apply(x1, data, Float64Array),
      x2: apply(x2, data, Float64Array),
      y1: apply(y1, data, Float64Array),
      y2: apply(y2, data, Float64Array),
      alpha: apply(alpha, data, Float64Array),
    };
  }

  function channels(input) {
    let { x, y, x1 = x, x2 = x, y1 = y, y2 = y, alpha } = transform;
    if (isArrayLike(input)) return { series: input, x1, x2, y1, y2, alpha };
    return {
      series: input.index,
      x1: vector(x1, input.x1),
      x2: vector(x2, input.x2),
      y1: vector(y1, input.y1),
      y2: vector(y2, input.y2),
      alpha: input.alpha != null ? vector(identity, input.alpha) : constant(1),
    };
  }

  /** @param {CanvasRenderingContext2D} context */
  function render(context) {
    let { series, x1, x2, y1, y2, alpha } = channels(data);

    context.fillStyle = "currentColor";
    for (let item of series) {
      context.globalAlpha = alpha(item);
      context.fillRect(x1(item), y1(item), x2(item) - x1(item), y2(item) - y1(item));
    }
  }

  return { render, snapshot };
}

function constant(value) {
  return () => value;
}

function apply(fn, data, type) {
  return fn != null ? (fn.length > 0 ? type.from(data, fn) : fn()) : null;
}

function vector(fn, data) {
  return isArrayLike(data)
    ? (pointer) => fn(data[pointer], pointer)
    : constant(fn != null ? fn(data) : data);
}

/** @param {any} input */
function isArrayLike(input) {
  return ArrayBuffer.isView(input) || Array.isArray(input);
}
