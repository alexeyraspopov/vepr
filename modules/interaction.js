const [North, South, West, East, Inside, Outside, Outbound] = [
  0b0000001, 0b0000010, 0b0000100, 0b0001000, 0b0010000, 0b0100000, 0b1000000,
];

/**
 * Brush allows gestures within controlled bounded space in unbounded cartesian
 * coordinates
 *
 * @param {"x" | "y" | "xy"} dimensions Gesture constraints
 */
export function brush(dimensions) {
  let x0, y0, x1, y1, constraints;
  let startX, startY;
  let allowsX = dimensions.includes("x");
  let allowsY = dimensions.includes("y");
  let state = "idle";
  let selection, snapshot;
  let handle = Outbound;

  /**
   * @param {[[number, number], [number, number]]} extent Top left and right
   *   bottom points of available space
   */
  function extent(extent) {
    [[x0, y0], [x1, y1]] = extent;
    constraints = extent;
  }

  function down(x, y) {
    startX = x;
    startY = y;
    snapshot = selection;
    handle =
      selection != null
        ? alignment(x, y, selection, allowsX, allowsY, constraints)
        : x0 < x && x < x1 && y0 < y && y < y1
          ? Outside
          : Outbound;
    state =
      handle === Outbound
        ? "idle"
        : handle === Outside
          ? "select"
          : handle === Inside
            ? "drag"
            : "resize";
  }

  function move(x, y) {
    if (state === "select") {
      let newX0 = allowsX ? Math.max(x0, Math.min(x, startX)) : x0;
      let newX1 = allowsX ? Math.min(Math.max(x, startX), x1) : x1;
      let newY0 = allowsY ? Math.max(y0, Math.min(y, startY)) : y0;
      let newY1 = allowsY ? Math.min(Math.max(y, startY), y1) : y1;
      let new0 = [newX0, newY0];
      let new1 = [newX1, newY1];
      selection = [new0, new1];
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
      let newX0 = allowsX ? candidateX0 + adjustX : x0;
      let newX1 = allowsX ? candidateX1 + adjustX : x1;
      let newY0 = allowsY ? candidateY0 + adjustY : y0;
      let newY1 = allowsY ? candidateY1 + adjustY : y1;
      let new0 = [newX0, newY0];
      let new1 = [newX1, newY1];
      selection = [new0, new1];
    }
    if (state === "resize") {
      let resizeX = allowsX && handle & (West + East);
      let resizeY = allowsY && handle & (North + South);
      let startX = resizeX ? snapshot[handle & East ? 0 : 1][0] : NaN;
      let startY = resizeY ? snapshot[handle & South ? 0 : 1][1] : NaN;
      let newX0 = resizeX ? Math.max(x0, Math.min(x, startX)) : snapshot[0][0];
      let newX1 = resizeX ? Math.min(Math.max(x, startX), x1) : snapshot[1][0];
      let newY0 = resizeY ? Math.max(y0, Math.min(y, startY)) : snapshot[0][1];
      let newY1 = resizeY ? Math.min(Math.max(y, startY), y1) : snapshot[1][1];
      let new0 = [newX0, newY0];
      let new1 = [newX1, newY1];
      selection = [new0, new1];
    }
  }

  function up(x, y) {
    state = "idle";
  }

  function cursor(x, y) {
    let handle =
      selection != null
        ? alignment(x, y, selection, allowsX, allowsY, constraints)
        : x0 < x && x < x1 && y0 < y && y < y1
          ? Outside
          : Outbound;
    if (handle === North + West || handle === South + East) return "nwse-resize";
    if (handle === North + East || handle === South + West) return "nesw-resize";
    if (handle === North || handle === South) return "ns-resize";
    if (handle === East || handle === West) return "ew-resize";
    if (handle === Inside) return "move";
    if (handle === Outbound) return "auto";
    return "crosshair";
  }

  function get() {
    return selection;
  }

  function idle() {
    return state === "idle";
  }

  return { extent, down, move, up, cursor, get, idle };
}

const threshold = 3;

function alignment(xa, ya, [[x0, y0], [x1, y1]], allowsX, allowsY, constraints) {
  let inboundX = constraints[0][0] < xa && xa < constraints[1][0];
  let inboundY = constraints[0][1] < ya && ya < constraints[1][1];
  if (!inboundX || !inboundY) return Outbound;
  let insideX = x0 < xa && xa < x1;
  let insideY = y0 < ya && ya < y1;
  let alignedW = allowsX && Math.abs(xa - x0) < threshold;
  let alignedE = allowsX && Math.abs(xa - x1) < threshold;
  let alignedN = allowsY && Math.abs(ya - y0) < threshold;
  let alignedS = allowsY && Math.abs(ya - y1) < threshold;
  if (alignedN && alignedW) return North + West;
  if (alignedS && alignedE) return South + East;
  if (alignedN && alignedE) return North + East;
  if (alignedS && alignedW) return South + West;
  if (alignedN && insideX) return North;
  if (alignedS && insideX) return South;
  if (alignedW && insideY) return West;
  if (alignedE && insideY) return East;
  if (insideX && insideY) return Inside;
  return Outside;
}

export function zoom(translateExtent, scaleExtent) {
  let [[x0, y0], [x1, y1]] = translateExtent;
  let [k0, k1] = scaleExtent;
  let state = [1, 0, 0];
  let snapshot = null;
  let startX, startY;

  function down(x, y) {
    startX = x;
    startY = y;
    snapshot = state;
  }

  function move(x, y) {
    let [_k, _x, _y] = snapshot;
    state = [_k, _x + _k * (x - startX), _y + _k * (y - startY)];
  }

  function up(x, y) {
    snapshot = null;
  }

  function scale(k) {
    let [_k, _x, _y] = state;
    state = [_k * k, _x, _y];
  }

  function get() {
    return state;
  }

  return { down, move, up, scale, get };
}
