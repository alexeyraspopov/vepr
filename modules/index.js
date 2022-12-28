export { dot } from "./mark/dot.js";
export { barX, barY } from "./mark/bar.js";
export { lineX, lineY } from "./mark/line.js"; // TODO line() only

export { identity } from "./transform/identity.js";

export { blueprint } from "./blueprint.js";
export { render } from "./render.js";

export { transferables } from "./transferables.js";

export { rank, bisect, extent, min, max, ascending, descending } from "./scale/array.js";
export {
  Linear,
  Ordinal,
  Threshold,
  Clamp,
  Quantile,
  Quantize,
  Diverging,
  Sequential,
  Band,
  Point,
} from "./scale/scale.js";
export { pow, log, symlog } from "./scale/number.js";
