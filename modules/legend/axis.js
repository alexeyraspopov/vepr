import { linearTicks } from "../scale/array.js";
import { NormalizeBand, NormalizeRange } from "../scale/number.js";

export function axisX(variable) {
  let x, ticks;
  if (variable.type === "numeral") {
    let [start, finish] = variable.domain;
    ticks = linearTicks(start, finish, 15);
    x = NormalizeRange(variable.domain);
  } else if (variable.type === "ordinal") {
    ticks = variable.domain;
    let norm = NormalizeBand(variable.domain, 0.1, 0.1);
    x = (v) => norm(v) + norm.bandwidth / 2;
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
      filterStrategy: "parity",
    },
  };
}

export function axisY(variable) {
  let y, ticks;
  if (variable.type === "numeral") {
    let [start, finish] = variable.domain;
    ticks = linearTicks(start, finish, 15);
    y = NormalizeRange(variable.domain);
  } else if (variable.type === "ordinal") {
    ticks = variable.domain;
    let norm = NormalizeBand(variable.domain, 0.1, 0.1);
    y = (v) => norm(v) + norm.bandwidth / 2;
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
      filterStrategy: "parity",
    },
  };
}

export function renderAxis(context, scales, channels) {
  let constant = (v) => (_) => v;
  let x = ArrayBuffer.isView(channels.x)
    ? (p) => scales.x(channels.x[p])
    : constant(scales.x(channels.x));
  let y = ArrayBuffer.isView(channels.y)
    ? (p) => scales.y(channels.y[p])
    : constant(scales.y(channels.y));

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
  let filter = channels.filterStrategy === "greedy" ? greedy : parity;

  if (ArrayBuffer.isView(channels.x)) {
    let gap = M.width;
    labels = filter(labels, gap);
  }

  if (ArrayBuffer.isView(channels.y)) {
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
