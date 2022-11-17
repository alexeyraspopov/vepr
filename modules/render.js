import { Linear } from "./scale/scale.js";

/**
 * Render a visualization blueprint using SVG
 * @param {Blueprint} blueprint - a thing to render
 * @param {SVGSVGElement} root - container to render to
 * @param {object} [style] - additional container styles
 */
export function render(blueprint, root, style) {
  let rect = root.getBoundingClientRect();

  let paddingX = style?.paddingX ?? 0;
  let paddingY = style?.paddingY ?? 0;
  let x = Linear([0, 2 ** 16], [0 + paddingX, rect.width - paddingX]);
  let y = Linear([0, 2 ** 16], [0 + paddingY, rect.height - paddingY]);
  let layout = document.createDocumentFragment();
  for (let layer of blueprint.layers) {
    let group = createElement("g", "svg");
    for (let pointer of layer.channels.index) {
      let fragment = document.createDocumentFragment();
      for (let shape of layer.shapes) {
        let node = createElement(shape.tag, "svg");
        let scope = { x, y, d: getDatumReaderBy(pointer, layer.channels) };
        for (let key in shape.attrs) {
          let expr = shape.attrs[key];
          let fn = new Function("scope", "with (scope) return " + expr);
          node.setAttribute(key, fn(scope));
        }
        fragment.appendChild(node);
      }
      group.appendChild(fragment);
    }
    layout.appendChild(group);
  }
  root.appendChild(layout);
}

function getDatumReaderBy(pointer, channels) {
  return new Proxy(Object.prototype, {
    get(_, key) {
      if (key in channels) return channels[key][pointer];
      else throw new Error("Unable to find channel " + key);
    },
  });
}

var uris = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: "http://www.w3.org/1999/xhtml",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function createElement(name, type) {
  return type == null ? document.createElement(name) : document.createElementNS(uris[type], name);
}
