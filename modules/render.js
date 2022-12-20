import { Linear, Track } from "./scale/scale.js";

/**
 * Render a visualization blueprint using Canvas
 *
 * @param {Blueprint} blueprint A thing to render
 * @param {HTMLCanvasElement} root Container to render to
 */
export function render(blueprint, root) {
  let rect = root.getBoundingClientRect();
  let ctx = root.getContext("2d");
  let trackX = Track(["40u", "1f"], rect.width, 25, 2);
  let trackY = Track(["1f", "40u"], rect.height, 10, 2);

  // Real canvas element size in dom is different from the drawing canvas available
  // The drawing canvas needs to be readjusted accordingly to the size available,
  // device pixel ratio and additional scaling factor for better image quality.
  let scaleFactor = 4;
  let ratio = window.devicePixelRatio * scaleFactor;
  root.width = rect.width * ratio;
  root.height = rect.height * ratio;
  ctx.scale(ratio, ratio);
  // HACK canvas only picks up currentColor if defined via style attribute
  root.style.color = getComputedStyle(root).getPropertyValue("color");
  let x = Linear([0, 2 ** 16], trackX(1, 1));
  let y = Linear([0, 2 ** 16], trackY(0, 1));
  for (let layer of blueprint.layers) {
    let shapes = layer.shapes.map(function sh(shape) {
      let pairs = Object.keys(shape.attrs).map((key) => `${key}: ${shape.attrs[key]}`);
      let attrs = new Function("x", "y", "d", `return { ${pairs.join(",")} }`);
      let render = getShapeByTag(shape.tag);
      return { attrs, render };
    });

    let cursor;
    let reader = new Proxy(Object.prototype, {
      get(_, key) {
        if (key in layer.channels) return layer.channels[key][cursor];
        else throw new Error("Unable to find channel " + key);
      },
    });

    ctx.save();
    for (let pointer of layer.channels.index) {
      cursor = pointer;
      for (let shape of shapes) {
        shape.render(ctx, shape.attrs(x, y, reader));
      }
    }
    ctx.restore();
  }
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
  ctx.rect(attrs.x, attrs.y, attrs.width, attrs.height);
  ctx.fillStyle = attrs.fill;
  ctx.fill();
}
