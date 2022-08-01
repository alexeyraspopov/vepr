import { scaleLinear } from "d3-scale";
import { create, select } from "d3-selection";

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
  let x = scaleLinear([0, 2 ** 16], [0 + paddingX, rect.width - paddingX]);
  let y = scaleLinear([0, 2 ** 16], [0 + paddingY, rect.height - paddingY]);
  let children = select(root).selectAll((_, index, nodes) => nodes[index].children);
  let key = (datum, index) => (datum != null ? datum.key : index);

  return children.data(blueprint.layers, key).join(
    (enter) => {
      enter.append((layer) => {
        let target = create("svg:g").attr("data-key", layer.key);
        let children = target.selectAll((_, index, nodes) => nodes[index].children);

        children.data(layer.channels.index).join(
          (enter) => {
            // QUESTION can I express layer.shapes in terms of selection
            for (let shape of layer.shapes) {
              enter.append((pointer) => {
                let target = create("svg:" + shape.tag).attr("data-key", pointer);
                let scope = { x, y, d: getDatumReaderBy(pointer, layer.channels) };
                for (let key in shape.attrs) {
                  let expr = shape.attrs[key];
                  let fn = new Function("scope", "with (scope) return " + expr);
                  target.attr(key, fn(scope));
                }
                return target.node();
              });
            }
          },
          (update) => {},
          (exit) => {},
        );

        return target.node();
      });
    },
    (update) => {
      console.log(update);
    },
    (exit) => {
      console.log(exit);
    },
  );
}

function getDatumReaderBy(pointer, channels) {
  return new Proxy(Object.prototype, {
    get(_, key) {
      if (key in channels) return channels[key][pointer];
      else throw new Error("Unable to find channel " + key);
    },
  });
}
