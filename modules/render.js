import { ObservableScope } from "./observable.js";
import { Track } from "./scale/scale.js";
import { markStart, markFinish } from "./profiling.js";
import { renderAxis } from "./legend/axis.js";
import * as shape from "./shape.js";

let renderFn = new Map([["axis", renderAxis]]);

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
  let style = observeContainerStyle(os, container);
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
    // HACK canvas only picks up currentColor and current font settings if defined via style attribute
    // re-render canvas if the color changes, so dark/light theme switch is supported
    Object.assign(canvas.style, style());

    let ctx = context();
    let { width, height } = size();

    let trackX = Track(["20u", "1f"], width, 20, 4);
    let trackY = Track(["1f", "25u"], height, 10, 4);

    let { layout } = bp();
    function interpolate([x0, x1]) {
      let k = x1 - x0;
      return (t) => x0 + k * t;
    }

    let areas = {
      main: {
        x: interpolate(trackX(1, 1)),
        y: interpolate(trackY(0, 1).reverse()),
      },
      haxis: {
        x: interpolate(trackX(1, 1)),
        y: interpolate(trackY(1, 1).reverse()),
      },
      vaxis: {
        x: interpolate(trackX(0, 1)),
        y: interpolate(trackY(0, 1).reverse()),
      },
    };

    let ctl = new AbortController();

    markStart("render");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let area in layout) {
      let scales = areas[area];
      let layers = layout[area];
      for (let layer of layers) {
        if (layer.key in shape) {
          ctx.save();
          shape[layer.key](layer, scales).render(ctx);
          ctx.restore();
        } else {
          let render = renderFn.get(layer.key);
          ctx.save();
          render(ctx, scales, layer.channels);
          ctx.restore();
        }
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

/**
 * Browser's devicePixelRatio can change dynamically when user switches monitor
 * resolution or moves a browser window from one monitor to another.
 *
 * @param {ObservableScope} os
 */
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
 * HTMLCanvas element doesn't inherit some style properties from parent. This
 * means the only way `currentColor` can be used for rendering is when the
 * canvas itself has the color styling set. This observer tracks parent's
 * current color and readjust when browser's color scheme changes.
 *
 * @param {ObservableScope} os
 * @param {HTMLElement} target
 */
function observeContainerStyle(os, target) {
  return os.observe(
    () => {
      let style = getComputedStyle(target);
      let color = style.getPropertyValue("color");
      let fontFamily = style.getPropertyValue("font-family");
      let fontFeatureSettings = style.getPropertyValue("font-feature-settings");
      return { color, fontFamily, fontFeatureSettings };
    },
    (cb) => {
      let media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", cb);
      return () => media.removeEventListener("change", cb);
    },
    shallowObjectEqual,
  );
}

/**
 * Rendering area of canvas can be different from its visual element's size.
 * This function computes proper rendering area size based on devicePixelRatio
 * and optional scaling factor that can enhance image sharpness (though by
 * consuming more CPU and RAM).
 *
 * @param {number} width
 * @param {number} height
 * @param {number} dpr
 * @param {number} [k=1] Additional scale factor that increases image quality by
 *   further expanding canvas area. Default is `1`
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
 * Initialize canvas element to render viz to. Parent container assumed to have
 * `position: relative` style to ensure fewer layout shifts during canvas
 * rescaling.
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
 * A routine to properly readjust HTMLCanvas size and acquire its 2D rendering
 * context. This function has additional tricks implemented for triggering
 * browser's GC cycles and making sure the rendering context exist (there are
 * known bugs in Webkit that can make it nullable).
 *
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
 * Iterates over keys of same type objects and returns false if any of
 * properties are not equal (using Object.is()). Otherwise returns true.
 *
 * @template [T=object] Default is `object`
 * @param {T} a
 * @param {T} b
 * @returns Boolean
 */
function shallowObjectEqual(a, b) {
  for (let k in a) if (!Object.is(a[k], b[k])) return false;
  return true;
}
