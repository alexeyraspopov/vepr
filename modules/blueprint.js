import { markStart, markFinish } from "./profiling.js";
import { extent, unique } from "./scale/array.js";
import { axisX, axisY } from "./legend/axis.js";

/**
 * A serializable representation of a data visualization
 *
 * @typedef {object} Blueprint
 * @property {object} layout
 */

/**
 * Materialize the data visualization so it can be sent to a renderer. The
 * blueprint composer function generates an optimized definition of data
 * visualization that then needs to be send to renderer.
 *
 * @returns {Blueprint}
 */
export function blueprint(options) {
  markStart("blueprint");

  let variables = options.marks.reduce(
    (vars, mark) => {
      let local = mark.next().value;
      for (let key in local) {
        if (vars[key] == null) {
          vars[key] = local[key];
        } else {
          let union = vars[key].domain.concat(local[key].domain);
          if (vars[key].type === "numeral") {
            vars[key] = Object.assign({}, vars[key], { domain: extent(union) });
          } else if (vars[key].type === "ordinal") {
            vars[key] = Object.assign({}, vars[key], { domain: unique(union) });
          }
        }
      }
      return vars;
    },
    { x: options.x, y: options.y },
  );

  let layers = options.marks.flatMap((mark) => mark.next(variables).value);

  // I can produce an array of layouts to represent faceting
  let layout = { main: layers, haxis: [axisX(variables.x)], vaxis: [axisY(variables.y)] };

  markFinish("blueprint");

  return { layout };
}
