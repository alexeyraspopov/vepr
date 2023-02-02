import { NormalizeBand, NormalizeRange } from "./scale/number.js";

export function normalizeOf(variable) {
  if (variable.type === "numeral") {
    return NormalizeRange(variable.domain);
  } else if (variable.type === "ordinal") {
    let norm = NormalizeBand(variable.domain, 0.1, 0.1);
    return (v) => norm(v) + norm.bandwidth / 2;
  }
  throw new Error(`Unsupported variable type: ${variable.type}`);
}
