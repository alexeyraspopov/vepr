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
 * @typedef {object} Mark
 * @property {Function} variables
 * @property {Function} channels
 */

/**
 * Materialize the data visualization so it can be sent to a renderer. The blueprint composer
 * function generates an optimized definition of data visualization that then needs to be send to
 * renderer.
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
            vars[key] = { ...vars[key], domain: extent(union) };
          } else if (vars[key].type === "ordinal") {
            vars[key] = { ...vars[key], domain: unique(union) };
          }
        }
      }
      return vars;
    },
    { x: options.x, y: options.y },
  );

  let channels = options.marks.map((mark) => mark.next(variables).value);

  let layout = { main: channels, haxis: [axisX(variables.x)], vaxis: [axisY(variables.y)] };

  markFinish("blueprint");

  return { layout };
}
