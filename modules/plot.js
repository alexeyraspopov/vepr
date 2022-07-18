import { scaleLinear } from "d3-scale";
import { create, select } from "d3-selection";

export function plot(root, layers) {
  let rect = root.getBoundingClientRect();

  let x = scaleLinear([0, 2 ** 16], [0, rect.width]);
  let y = scaleLinear([0, 2 ** 16], [0, rect.height]);

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
                for (let key in shape.attrs) {
                  let expr = shape.attrs[key];
                  let fn = new Function("x", "y", "d", "return " + expr);
                  target.attr(key, fn(x, y, access));
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
