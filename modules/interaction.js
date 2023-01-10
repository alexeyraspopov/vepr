/**
 * Brush allows gestures within controlled bounded space in unbounded cartesian coordinates
 *
 * @param {[[number, number], [number, number]]} extent Top left and right bottom points of
 *   available space
 * @param {("x" | "y")[]} dimensions Gesture constraints
 */
export function brush(extent, dimensions) {
  let [[x0, y0], [x1, y1]] = extent;
  let allowsX = dimensions.includes("x");
  let allowsY = dimensions.includes("y");
  let startX, startY;
  let state = "idle";
  let selection = null;
  let snapshot;
  let offset = 6;
  let handle = null;

  function down(x, y) {
    startX = x;
    startY = y;
    state =
      selection == null
        ? "select"
        : within(x, selection[0][0] + offset / 2, selection[1][0] - offset / 2) &&
          within(y, selection[0][1] + offset / 2, selection[1][1] - offset / 2)
        ? "drag"
        : (handle = aligned([x, y], selection, offset, allowsX, allowsY))
        ? "resize"
        : "select";
    snapshot = selection;
  }

  function move(x, y) {
    if (state === "select") {
      let [candidateX0, candidateX1] =
        x > startX
          ? [Math.max(x0, startX), Math.min(x, x1)]
          : [Math.max(x0, x), Math.min(startX, x1)];
      let [candidateY0, candidateY1] =
        y > startY
          ? [Math.max(y0, startY), Math.min(y, y1)]
          : [Math.max(y0, y), Math.min(startY, y1)];
      selection = [
        [allowsX ? candidateX0 : x0, allowsY ? candidateY0 : y0],
        [allowsX ? candidateX1 : x1, allowsY ? candidateY1 : y1],
      ];
    }
    if (state === "drag") {
      let dx = x - startX;
      let dy = y - startY;
      let candidateX0 = snapshot[0][0] + dx;
      let candidateX1 = snapshot[1][0] + dx;
      let adjustX = candidateX0 < x0 ? x0 - candidateX0 : candidateX1 > x1 ? x1 - candidateX1 : 0;
      let candidateY0 = snapshot[0][1] + dy;
      let candidateY1 = snapshot[1][1] + dy;
      let adjustY = candidateY0 < y0 ? y0 - candidateY0 : candidateY1 > y1 ? y1 - candidateY1 : 0;
      selection = [
        [allowsX ? candidateX0 + adjustX : x0, allowsY ? candidateY0 + adjustY : y0],
        [allowsX ? candidateX1 + adjustX : x1, allowsY ? candidateY1 + adjustY : y1],
      ];
    }
    if (state === "resize") {
      let candidateX0, candidateX1, candidateY0, candidateY1;
      if (/[sn]/.test(handle)) {
        let n = /s/.test(handle) ? 0 : 1;
        [candidateY0, candidateY1] =
          y > snapshot[n][1]
            ? [Math.max(y0, snapshot[n][1]), Math.min(y, y1)]
            : [Math.max(y0, y), Math.min(snapshot[n][1], y1)];
      } else {
        [candidateY0, candidateY1] = [snapshot[0][1], snapshot[1][1]];
      }
      if (/[ew]/.test(handle)) {
        let n = /e/.test(handle) ? 0 : 1;
        [candidateX0, candidateX1] =
          x > snapshot[n][0]
            ? [Math.max(x0, snapshot[n][0]), Math.min(x, x1)]
            : [Math.max(x0, x), Math.min(snapshot[n][0], x1)];
      } else {
        [candidateX0, candidateX1] = [snapshot[0][0], snapshot[1][0]];
      }
      selection = [
        [allowsX ? candidateX0 : x0, allowsY ? candidateY0 : y0],
        [allowsX ? candidateX1 : x1, allowsY ? candidateY1 : y1],
      ];
    }
  }

  function up(x, y) {
    state = "idle";
    snapshot = null;
    handle = null;
  }

  function cursor(point) {
    if (selection == null || point == null) return "crosshair";
    let [xa, ya] = point;
    let [[x0, y0], [x1, y1]] = selection;
    let insideX = within(xa, x0, x1);
    let insideY = within(ya, y0, y1);
    let alignedW = allowsX && within(xa, x0 - offset / 2, x0 + offset / 2);
    let alignedE = allowsX && within(xa, x1 - offset / 2, x1 + offset / 2);
    let alignedN = allowsY && within(ya, y0 - offset / 2, y0 + offset / 2);
    let alignedS = allowsY && within(ya, y1 - offset / 2, y1 + offset / 2);
    if ((alignedN && alignedW) || (alignedS && alignedE)) return "nwse-resize";
    if ((alignedN && alignedE) || (alignedS && alignedW)) return "nesw-resize";
    if ((alignedN || alignedS) && insideX) return "ns-resize";
    if ((alignedE || alignedW) && insideY) return "ew-resize";
    if (insideX && insideY) return "move";
    return "crosshair";
  }

  function get() {
    return selection;
  }

  return { down, move, up, cursor, get };
}

function within(x, a, b) {
  return a < x && x < b;
}

function aligned([xa, ya], [[x0, y0], [x1, y1]], offset, allowsX, allowsY) {
  let insideX = within(xa, x0, x1);
  let insideY = within(ya, y0, y1);
  let alignedW = allowsX && within(xa, x0 - offset / 2, x0 + offset / 2);
  let alignedE = allowsX && within(xa, x1 - offset / 2, x1 + offset / 2);
  let alignedN = allowsY && within(ya, y0 - offset / 2, y0 + offset / 2);
  let alignedS = allowsY && within(ya, y1 - offset / 2, y1 + offset / 2);
  if (alignedN && alignedW) return "nw";
  if (alignedS && alignedE) return "se";
  if (alignedN && alignedE) return "ne";
  if (alignedS && alignedW) return "sw";
  if (alignedN && insideX) return "n";
  if (alignedS && insideX) return "s";
  if (alignedW && insideY) return "w";
  if (alignedE && insideY) return "e";
  return null;
}
