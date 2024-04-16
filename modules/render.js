import { ObservableScope } from "./observable.js";

import { track } from "./scale/scale.js";
import { markStart, markFinish } from "./profiling.js";
import { renderAxis } from "./legend/axis.js";
import * as shape from "./shape.js";
import { interpolateLinear } from "./scale/function.js";

/**
 * Create canvas rendering controller
 *
 * @param {HTMLElement} container HTML element to render to
 * @param {number} [layers=1] Default is `1`
 */
export function stage(container, layers = 1) {
  let os = ObservableScope();
  let canvas = createCanvas(container);
  let size = observeElementSize(os, container);
  let style = observeContainerStyle(os, container);
  let devicePixelRatio = observeDevicePixelRatio(os);
  let pointer = observePointer(os, container);

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

  function dispose() {
    releaseCanvas(canvas);
    canvas.remove();
    canvas = null;
    os.dispose();
  }

  return { os, canvas, size, style, scale, context, pointer, dispose };
}

/**
 * Render a visualization blueprint using Canvas
 *
 * @deprecated This will be moved to the user space soon
 * @param {Blueprint} blueprint A thing to render
 * @param {HTMLElement} container HTML element to render to
 */
export function render(blueprint, container) {
  let cnvs = stage(container);
  let bp = cnvs.os.observable(blueprint);

  let blocks = cnvs.os.computed(() => {
    let { width, height } = cnvs.size();

    let trackX = track(["20u", "1f"], width, 20, 4);
    let trackY = track(["1f", "30u"], height, 10, 4);

    return {
      main: {
        x: interpolateLinear(...trackX(1, 1)),
        y: interpolateLinear(...trackY(0, 1).reverse()),
      },
      haxis: {
        x: interpolateLinear(...trackX(1, 1)),
        y: interpolateLinear(...trackY(1, 1).reverse()),
      },
      vaxis: {
        x: interpolateLinear(...trackX(0, 1)),
        y: interpolateLinear(...trackY(0, 1).reverse()),
      },
    };
  });

  cnvs.os.watch(() => {
    // HACK canvas only picks up currentColor and current font settings if defined via style attribute
    // re-render canvas if the color changes, so dark/light theme switch is supported
    Object.assign(cnvs.canvas.style, cnvs.style());

    let { width, height } = cnvs.size();
    let ctx = cnvs.context();
    let { layout } = bp();
    let areas = blocks();
    let renderFn = new Map([["axis", renderAxis]]);
    let actl = new AbortController();
    markStart("render");
    ctx.clearRect(0, 0, width, height);
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
    return () => actl.abort();
  });

  return { update: bp, remove: cnvs.dispose };
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
 * @param {ObservableScope} os
 * @param {HTMLElement} target
 */
function observePointer(os, target) {
  let state = { down: false, over: false, x: 0, y: 0 };
  /** @param {PointerEvent} event */
  function handleEvent(event) {
    switch (event.type) {
      case "pointerdown":
        state.down = true;
        break;
      case "pointerup":
        state.down = false;
        break;
      case "pointerenter":
        state.over = true;
        break;
      case "pointerleave":
        state.over = false;
        break;
      case "pointermove":
        state.x = event.offsetX;
        state.y = event.offsetY;
        break;
    }
  }
  return os.observe(
    () => state,
    (cb) => {
      /** @param {PointerEvent} event */
      function handle(event) {
        if (event.name === "pointerdown") {
          target.setPointerCapture(event.pointerId);
        } else if (event.name === "pointerup") {
          target.releasePointerCapture(event.pointerId);
        }
        handleEvent(event);
        cb();
      }

      target.addEventListener("pointermove", handle);
      target.addEventListener("pointerdown", handle);
      target.addEventListener("pointerup", handle);
      target.addEventListener("pointerenter", handle);
      target.addEventListener("pointerleave", handle);
      return () => {
        target.removeEventListener("pointermove", handle);
        target.removeEventListener("pointerdown", handle);
        target.removeEventListener("pointerup", handle);
        target.removeEventListener("pointerover", handle);
        target.removeEventListener("pointerleave", handle);
      };
    },
    () => false,
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
  canvas.style.inset = "0 0 0 0";
  canvas.style.background = "transparent";
  canvas.style.border = "none";
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
