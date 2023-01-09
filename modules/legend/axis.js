import { linearTicks } from "../scale/array.js";
import { Linear, Band } from "../scale/scale.js";

export function axisX(variable) {
  let x, ticks;
  if (variable.type === "numeral") {
    let [start, finish] = variable.domain;
    ticks = linearTicks(start, finish, 15);
    x = Linear(variable.domain, [0, 2 ** 16]);
  } else if (variable.type === "ordinal") {
    ticks = variable.domain;
    let sx = Band(variable.domain, [0, 2 ** 16], 0.1, 0.1);
    x = (v) => sx(v) + sx.bandwidth() / 2;
  }
  return {
    key: "axis",
    channels: {
      index: Uint32Array.from(ticks, (_, i) => i),
      x: Float64Array.from(ticks, x),
      y: 2 ** 16 / 2,
      text: ticks,
      textAlign: "center",
      textBaseline: "middle",
    },
  };
}

export function axisY(variable) {
  let y, ticks;
  if (variable.type === "numeral") {
    let [start, finish] = variable.domain;
    ticks = linearTicks(start, finish, 15);
    y = Linear(variable.domain, [2 ** 16, 0]);
  } else if (variable.type === "ordinal") {
    ticks = variable.domain;
    let sy = Band(variable.domain, [2 ** 16, 0], 0.1, 0.1);
    y = (v) => sy(v) + sy.bandwidth() / 2;
  }
  return {
    key: "axis",
    channels: {
      index: Uint32Array.from(ticks, (_, i) => i),
      x: 2 ** 16 / 2,
      y: Float64Array.from(ticks, y),
      text: ticks,
      textAlign: "right",
      textBaseline: "middle",
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
    return { text, width: metric.width, x: x(pointer), y: y(pointer) };
  });

  if (ArrayBuffer.isView(channels.x)) {
    let gap = context.measureText("M").width;
    while (hasTextOverlapX(labels, gap)) {
      labels = labels.filter((_, index) => index % 2 === 0);
    }
  }

  if (ArrayBuffer.isView(channels.y)) {
    let gap = context.measureText("M").emHeightAscent * 2;
    while (hasTextOverlapY(labels, gap)) {
      labels = labels.filter((_, index) => index % 2 === 0);
    }
  }

  for (let label of labels) {
    context.fillText(label.text, label.x, label.y);
  }
}

function hasTextOverlapX(labels, gap) {
  return labels.some((label, index, all) => {
    return index < all.length - 1 && label.x + label.width + gap >= all[index + 1].x;
  });
}

function hasTextOverlapY(labels, gap) {
  return labels.some((label, index, all) => {
    return index > 0 && label.y + gap >= all[index - 1].y - gap;
  });
}
