import { scaleLinear } from "d3-scale";
import { create, select } from "d3-selection";

/**
 * @deprecated use blueprint() and render()
 */
export function plot(root, layers, style = {}) {
  let rect = root.getBoundingClientRect();

  let paddingX = style.paddingX ?? 0;
  let paddingY = style.paddingY ?? 0;
  let x = scaleLinear([0, 2 ** 16], [0 + paddingX, rect.width - paddingX]);
  let y = scaleLinear([0, 2 ** 16], [0 + paddingY, rect.height - paddingY]);

  let key = (datum, index) => (datum != null ? datum.key : index);
  let children = select(root).selectAll((_, index, nodes) => nodes[index].children);

  return children.data(layers, key).join(
    (enter) => {
      enter.append((layer) => {
        let target = create("svg:g").attr("data-key", layer.key);
        let children = target.selectAll((_, index, nodes) => nodes[index].children);

        children.data(layer.channels.index).join(
          (enter) => {
            for (let shape of layer.shapes) {
              enter.append((pointer) => {
                let target = create("svg:" + shape.tag);
                target.attr("data-key", pointer);

                let access = new Proxy({}, { get: (_, key) => layer.channels[key][pointer] });
                let scope = { x, y, d: access };
                for (let key in shape.attrs) {
                  let fn = new Function("scope", "with (scope) return " + shape.attrs[key]);
                  target.attr(key, fn(scope));
                }

                return target.node();
              });
            }
          },
          (update) => {
            update.each(function () {});
          },
          (exit) => {},
        );

        return target.node();
      });
    },
    (update) => {
      update.each(function (layer) {
        console.log("update", this, layer);
      });
    },
    (exit) => {
      exit.each(function (layer) {
        console.log("exit", this, layer);
      });
    },
  );
}
