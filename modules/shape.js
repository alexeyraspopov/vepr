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
    if (!(ArrayBuffer.isView(data) || Array.isArray(data))) return data;
    let { x, y, r } = Object.assign({}, transform);
    let apply = (f, d, t) => (f != null ? (f.length > 0 ? t.from(d, f) : f()) : null);
    return {
      key: "dot",
      index: Uint32Array.from(data, (_, i) => i),
      x: apply(x, data, Float64Array),
      y: apply(y, data, Float64Array),
      r: apply(r, data, Float64Array),
    };
  }

  function channels(input) {
    let { x, y, r } = Object.assign({ r: constant(3) }, transform);
    if (Array.isArray(input)) return { series: input, x, y, r };
    return {
      series: input.index,
      x: vector(x, input.x),
      y: vector(y, input.y),
      r: vector(r, input.r),
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

function constant(value) {
  return (_) => value;
}

function vector(fn, data) {
  return ArrayBuffer.isView(data) || Array.isArray(data)
    ? (pointer) => fn(data[pointer], pointer)
    : constant(fn != null ? fn(data) : data);
}

function identity(value) {
  return identity;
}
