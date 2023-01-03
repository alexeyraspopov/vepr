import { markStart, markFinish } from "./profiling.js";
import { extent } from "./scale/array.js";
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

  let variableSets = options.marks.map((mark) => mark.variables());

  let variables = variableSets.reduce(
    (vars, set) => {
      let localVars = set[1];
      for (let key in localVars) {
        if (vars[key] == null) {
          vars[key] = localVars[key];
        } else {
          if (vars[key].type === "q") {
            vars[key] = {
              ...vars[key],
              domain: extent(vars[key].domain.concat(localVars[key].domain)),
            };
          }
        }
      }
      return vars;
    },
    { x: options.x, y: options.y },
  );
  let channels = options.marks.map((mark, index) =>
    mark.channels(variableSets[index][0], variables),
  );

  let layout = { main: channels, haxis: [axisX(variables.x)], vaxis: [axisY(variables.y)] };

  markFinish("blueprint");

  return { layout };
}
