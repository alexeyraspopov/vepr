import { extent, unique } from "./scale/array.js";
import { normalizeBand, normalizeLinear } from "./scale/function.js";

export function normalizeOf(variable) {
  if (variable.type === "numeral") {
    return normalizeLinear(variable.domain[0], variable.domain[1]);
  } else if (variable.type === "ordinal") {
    let norm = normalizeBand(variable.domain, 0.1, 0.1);
    return Object.assign((v) => norm(v) + norm.width / 2, norm);
  }
  throw new Error(`Unsupported variable type: ${variable.type}`);
}

export function apply(scale, channel) {
  return ArrayBuffer.isView(channel) ? (p) => scale(channel[p]) : constant(scale(channel));
}

function constant(v) {
  return (_) => v;
}
