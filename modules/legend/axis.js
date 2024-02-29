import { linearTicks } from "../scale/array.js";
import { apply, normalizeOf } from "../variable.js";

export function axisX(variable) {
  let x = normalizeOf(variable);
  let ticks;
  if (variable.type === "numeral") {
    ticks = linearTicks(variable.domain[0], variable.domain[1], 15);
  } else if (variable.type === "ordinal") {
    ticks = variable.domain;
  }
  return {
    key: "axis",
    channels: {
      index: Uint32Array.from(ticks, (_, i) => i),
      x: Float64Array.from(ticks, x),
      y: 1 / 2,
      text: ticks,
      textAlign: "center",
      textBaseline: "middle",
      filterStrategy: variable.type === "numeral" ? "parity" : null,
    },
  };
}

export function axisY(variable) {
  let y = normalizeOf(variable);
  let ticks;
  if (variable.type === "numeral") {
    ticks = linearTicks(variable.domain[0], variable.domain[1], 15);
  } else if (variable.type === "ordinal") {
    ticks = variable.domain;
  }
  return {
    key: "axis",
    channels: {
      index: Uint32Array.from(ticks, (_, i) => i),
      x: 1 / 2,
      y: Float64Array.from(ticks, y),
      text: ticks,
      textAlign: "right",
      textBaseline: "middle",
      filterStrategy: variable.type === "numeral" ? "parity" : null,
    },
  };
}

export function renderAxis(context, scales, channels) {
  let x = apply(scales.x, channels.x);
  let y = apply(scales.y, channels.y);

  context.font = "normal 10px/1 sans-serif";
  context.fillStyle = "currentColor";
  context.textAlign = channels.textAlign;
  context.textBaseline = channels.textBaseline;

  let labels = Array.from(channels.index, (pointer) => {
    let text = channels.text[pointer];
    let metric = context.measureText(text);
    let x1 = x(pointer);
    let y1 = y(pointer);
    let x2 = x1 + metric.width;
    let y2 = y1 + metric.actualBoundingBoxAscent + metric.actualBoundingBoxDescent;
    return { text, x1, x2, y1, y2 };
  });

  let M = context.measureText("M");
  let filter =
    channels.filterStrategy != null
      ? channels.filterStrategy === "greedy"
        ? greedy
        : parity
      : null;

  if (filter != null && ArrayBuffer.isView(channels.x)) {
    let gap = M.width;
    labels = filter(labels, gap);
  }

  if (filter != null && ArrayBuffer.isView(channels.y)) {
    let gap = M.actualBoundingBoxAscent + M.actualBoundingBoxDescent;
    labels = filter(labels, gap);
  }

  for (let label of labels) {
    context.fillText(label.text, label.x1, label.y1);
  }
}

function parity(labels, gap) {
  while (labels.some((l, i, ls) => i > 0 && intersect(l, ls[i - 1], gap))) {
    labels = labels.filter((_, index) => index % 2 === 0);
  }
  return labels;
}

function greedy(labels, gap) {
  let cursor;
  return labels.filter(
    (label) => (cursor == null || !intersect(label, cursor, gap)) && ((cursor = label), true),
  );
}

function intersect(a, b, gap = 0) {
  return gap > Math.max(b.x1 - a.x2, a.x1 - b.x2, b.y1 - a.y2, a.y1 - b.y2);
}
