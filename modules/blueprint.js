/**
 * A serializable representation of a data visualization
 * @typedef {object} Blueprint
 * @property {Array<any>} layers
 */

/**
 * Materialize the data visualization so it can be sent to a renderer
 * @returns {Blueprint}
 */
export function blueprint(options) {
  let layers = options.marks;
  return { layers };
}
