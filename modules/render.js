import { ObservableContext } from "./observable.js";
import { Linear, Track } from "./scale/scale.js";

/**
 * Render a visualization blueprint using Canvas
 *
 * @param {Blueprint} blueprint A thing to render
 * @param {HTMLElement} container HTML element to render to
 */
export function render(blueprint, container) {
  let co = ObservableContext();
  let canvas = createCanvas(container);
  let size = observeElementSize(co, container);
  let currentColor = observeCurrentColor(co, container);
  let devicePixelRatio = observeDevicePixelRatio(co);

  let scale = co.computed(() => {
    let { width, height } = size();
    let dpr = devicePixelRatio();
    return scaleCanvasArea(width, height, dpr);
  }, shallowObjectEqual);

  let layers = co.computed(() => {
    return blueprint.layers.map((layer) => {
      let shapes = layer.shapes.map((shape) => {
        let pairs = Object.keys(shape.attrs).map((key) => `${key}: ${shape.attrs[key]}`);
        let attrs = new Function("x", "y", "d", `return { ${pairs.join(",")} }`);
        let render = getShapeByTag(shape.tag);
        return { attrs, render };
      });
      let channels = layer.channels;
      let key = layer.key;
      return { key, shapes, channels };
    });
  });

  let context = co.computed(() => {
    // Real canvas element size in dom is different from the drawing canvas available
    // The drawing canvas needs to be readjusted accordingly to the size available,
    // device pixel ratio and additional scaling factor for better image quality.
    let { width, height, ratio } = scale();
    let tries = 0;
    let ctx;
    do {
      releaseCanvas(canvas);
      ctx = canvas.getContext("2d", { desynchronized: true });
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      // https://bugs.webkit.org/show_bug.cgi?id=195325
      // Canvas context can be null in Webkit. Doing our best to recover
    } while (ctx == null || ++tries < 2);
    ctx.scale(ratio, ratio);
    return ctx;
  });

  co.watch(() => {
    // HACK canvas only picks up currentColor if defined via style attribute
    canvas.style.color = currentColor();
    let ctx = context();

    let { width, height } = size();

    let trackX = Track(["40u", "1f"], width, 25, 2);
    let trackY = Track(["1f", "40u"], height, 10, 2);
    // positional scales needs to be define per layer,
    // since different layers may pick different slots
    let x = Linear([0, 2 ** 16], trackX(1, 1));
    let y = Linear([0, 2 ** 16], trackY(0, 1));
    // let color = either sequential or ordinal?

    let cursor;
    let channels;
    let reader = new Proxy(Object.prototype, {
      get(_, key) {
        if (key in channels) return channels[key][cursor];
        else throw new Error("Unable to find channel " + key);
      },
    });

    let ref = requestAnimationFrame(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let layer of layers()) {
        let shapes = layer.shapes;
        channels = layer.channels;

        ctx.save();
        for (let pointer of layer.channels.index) {
          cursor = pointer;
          for (let shape of shapes) {
            shape.render(ctx, shape.attrs(x, y, reader));
          }
        }
        ctx.restore();
      }
    });
    return () => {
      cancelAnimationFrame(ref);
    };
  });

  function remove() {
    releaseCanvas(canvas);
    target.remove();
    target = null;
  }

  return { remove };
}

/**
 * @param {ObservableContext} co
 * @param {HTMLElement} target
 */
function observeElementSize(co, target) {
  return co.observe(
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

/** @param {ObservableContext} co */
function observeDevicePixelRatio(co) {
  return co.observe(
    () => window.devicePixelRatio,
    (cb) => {
      let media = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      media.addEventListener("change", cb);
      return () => media.addEventListener("change", cb);
    },
  );
}

/**
 * @param {ObservableContext} co
 * @param {HTMLElement} target
 */
function observeCurrentColor(co, target) {
  return co.observe(
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
 */
function scaleCanvasArea(width, height, dpr) {
  let maxCanvasArea = 2 ** 24; // iOS can't handle more
  let scaleFactor, ratio, rwidth, rheight;

  // reduce scale factor until the canvas fits the limits
  // start with 3 for iOS, 4 for any other retina, 2 for old displays
  scaleFactor = dpr > 1 ? 6 - dpr : 2;
  do {
    ratio = dpr * scaleFactor;
    rwidth = (width * ratio) | 0;
    rheight = (height * ratio) | 0;
  } while (rwidth * rheight > maxCanvasArea && --scaleFactor > 1);

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
 * @template [T=object] Default is `object`
 * @param {T} a
 * @param {T} b
 * @returns Boolean
 */
function shallowObjectEqual(a, b) {
  for (let k in a) if (!Object.is(a[k], b[k])) return false;
  return true;
}

function getShapeByTag(tag) {
  switch (tag) {
    case "circle":
      return circle;
    case "rect":
      return rect;
    default:
      return Function.prototype;
  }
}

function circle(ctx, attrs) {
  ctx.beginPath();
  ctx.arc(attrs.cx, attrs.cy, attrs.r, 0, 2 * Math.PI, false);
  ctx.strokeStyle = attrs.stroke;
  ctx.stroke();
}

function rect(ctx, attrs) {
  ctx.fillStyle = attrs.fill;
  ctx.fillRect(attrs.x, attrs.y, attrs.width, attrs.height);
}
