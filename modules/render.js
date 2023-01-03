import { ObservableScope } from "./observable.js";
import { Linear, Track } from "./scale/scale.js";
import { markStart, markFinish } from "./profiling.js";
import { renderDot } from "./mark/dot.js";
import { renderBar } from "./mark/bar.js";
import { renderLine } from "./mark/line.js";
import { renderAxis } from "./legend/axis.js";

let renderFn = new Map([
  ["dot", renderDot],
  ["bar", renderBar],
  ["line", renderLine],
  ["axis", renderAxis],
]);

/**
 * Render a visualization blueprint using Canvas
 *
 * @param {Blueprint} blueprint A thing to render
 * @param {HTMLElement} container HTML element to render to
 */
export function render(blueprint, container) {
  let os = ObservableScope();
  let bp = os.observable(blueprint);
  let canvas = createCanvas(container);
  let size = observeElementSize(os, container);
  let currentColor = observeCurrentColor(os, container);
  let devicePixelRatio = observeDevicePixelRatio(os);

  // Real canvas element size in dom is different from the drawing canvas available
  // The drawing canvas needs to be readjusted accordingly to the size available,
  // device pixel ratio and additional scaling factor for better image quality.
  let scale = os.computed(() => {
    let { width, height } = size();
    let dpr = devicePixelRatio();
    return scaleCanvasArea(width, height, dpr);
  }, shallowObjectEqual);

  let context = os.computed(() => {
    let { width, height, ratio } = scale();
    return acquireCanvasContext(canvas, width, height, ratio);
  });

  os.watch(() => {
    // HACK canvas only picks up currentColor if defined via style attribute
    // re-render canvas if the color changes, so dark/light theme switch is supported
    canvas.style.color = currentColor();

    let ctx = context();
    let { width, height } = size();

    let trackX = Track(["20u", "1f"], width, 20, 4);
    let trackY = Track(["1f", "25u"], height, 10, 4);

    let { layout } = bp();
    let areas = {
      main: { x: Linear([0, 2 ** 16], trackX(1, 1)), y: Linear([0, 2 ** 16], trackY(0, 1)) },
      haxis: { x: Linear([0, 2 ** 16], trackX(1, 1)), y: Linear([0, 2 ** 16], trackY(1, 1)) },
      vaxis: { x: Linear([0, 2 ** 16], trackX(0, 1)), y: Linear([0, 2 ** 16], trackY(0, 1)) },
    };

    let ctl = new AbortController();

    markStart("render");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let area in layout) {
      let scales = areas[area];
      let layers = layout[area];
      for (let layer of layers) {
        let render = renderFn.get(layer.key);

        ctx.save();
        render(ctx, scales, layer.channels);
        ctx.restore();
      }
    }

    markFinish("render");

    return () => ctl.abort();
  });

  /** @param {Blueprint} blueprint */
  function update(blueprint) {
    bp(blueprint);
  }

  function remove() {
    releaseCanvas(canvas);
    canvas.remove();
    canvas = null;
    os.dispose();
  }

  return { update, remove };
}

/**
 * @param {ObservableScope} os
 * @param {HTMLElement} target
 */
function observeElementSize(os, target) {
  return os.observe(
    () => {
      let rect = target.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    },
    (cb) => {
      let observer = new ResizeObserver(cb);
      observer.observe(target);
      return () => observer.disconnect();
    },
    shallowObjectEqual,
  );
}

/** @param {ObservableScope} os */
function observeDevicePixelRatio(os) {
  return os.observe(
    () => window.devicePixelRatio,
    (cb) => {
      let media = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      media.addEventListener("change", cb);
      return () => media.addEventListener("change", cb);
    },
  );
}

/**
 * @param {ObservableScope} os
 * @param {HTMLElement} target
 */
function observeCurrentColor(os, target) {
  return os.observe(
    () => getComputedStyle(target).getPropertyValue("color"),
    (cb) => {
      let media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", cb);
      return () => media.removeEventListener("change", cb);
    },
  );
}

/**
 * @param {number} width
 * @param {number} height
 * @param {number} dpr
 * @param {number} [k=1] Additional scale factor that increases image quality by further expanding
 *   canvas area. Default is `1`
 */
function scaleCanvasArea(width, height, dpr, k = 1) {
  let maxCanvasArea = 2 ** 24; // iOS can't handle more
  let ratio, rwidth, rheight;

  // reduce scale factor until the canvas fits the limits
  do {
    ratio = dpr * k;
    rwidth = (width * ratio) | 0;
    rheight = (height * ratio) | 0;
  } while (rwidth * rheight > maxCanvasArea && --k > 1);

  return { width: rwidth, height: rheight, ratio };
}

/**
 * Initialize canvas element to render viz to
 *
 * @param {HTMLElement} container
 */
function createCanvas(container) {
  let canvas = document.createElement("canvas");
  canvas.style.display = "block";
  canvas.style.position = "absolute";
  canvas.style.top = 0;
  container.append(canvas);
  return canvas;
}

/**
 * Doing our best to make browser release some memory
 *
 * @param {HTMLCanvasElement} target
 */
function releaseCanvas(target) {
  target.width = 1;
  target.height = 1;
  target.style.width = "1px";
  target.style.height = "1px";
  let ctx = target.getContext("2d");
  if (ctx != null) {
    ctx.clearRect(0, 0, 1, 1);
    ctx = null;
  }
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {number} width
 * @param {number} height
 * @param {number} ratio
 */
function acquireCanvasContext(canvas, width, height, ratio) {
  let tries = 0;
  let ctx;
  do {
    releaseCanvas(canvas);
    ctx = canvas.getContext("2d", { desynchronized: true });
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.transform = "translateZ(0) scale(1)";
    // https://bugs.webkit.org/show_bug.cgi?id=195325
    // Canvas context can be null in Webkit. Doing our best to recover
  } while (ctx == null || ++tries < 2);
  ctx.scale(ratio, ratio);
  return ctx;
}

/**
 * @template [T=object] Default is `object`
 * @param {T} a
 * @param {T} b
 * @returns Boolean
 */
function shallowObjectEqual(a, b) {
  for (let k in a) if (!Object.is(a[k], b[k])) return false;
  return true;
}
