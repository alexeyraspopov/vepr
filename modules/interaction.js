const [N, S, W, E] = [0b0001, 0b0010, 0b0100, 0b1000];

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
      let newX0 = allowsX ? Math.max(x0, Math.min(x, startX)) : x0;
      let newX1 = allowsX ? Math.min(Math.max(x, startX), x1) : x1;
      let newY0 = allowsY ? Math.max(y0, Math.min(y, startY)) : y0;
      let newY1 = allowsY ? Math.min(Math.max(y, startY), y1) : y1;
      selection = [
        [newX0, newY0],
        [newX1, newY1],
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
      let resizeX = handle & (W + E);
      let startXN = resizeX ? snapshot[handle & E ? 0 : 1][0] : null;
      let newX0 = allowsX ? (resizeX ? Math.max(x0, Math.min(x, startXN)) : snapshot[0][0]) : x0;
      let newX1 = allowsX ? (resizeX ? Math.min(Math.max(x, startXN), x1) : snapshot[1][0]) : x1;
      let resizeY = handle & (N + S);
      let startYN = resizeY ? snapshot[handle & S ? 0 : 1][1] : null;
      let newY0 = allowsY ? (resizeY ? Math.max(y0, Math.min(y, startYN)) : snapshot[0][1]) : y0;
      let newY1 = allowsY ? (resizeY ? Math.min(Math.max(y, startYN), y1) : snapshot[1][1]) : y1;
      selection = [
        [newX0, newY0],
        [newX1, newY1],
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
  if (alignedN && alignedW) return N + W;
  if (alignedS && alignedE) return S + E;
  if (alignedN && alignedE) return N + E;
  if (alignedS && alignedW) return S + W;
  if (alignedN && insideX) return N;
  if (alignedS && insideX) return S;
  if (alignedW && insideY) return W;
  if (alignedE && insideY) return E;
  return null;
}
