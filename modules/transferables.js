/**
 * Collect references to all values that can be transferred via postMessage(). See
 * https://developer.mozilla.org/en-US/docs/Glossary/Transferable_objects
 *
 * @param {any} input - Any nested data structure to collect transferables from
 * @returns {Transferable[]} A collection of transferable refs
 */
export function transferables(input) {
  return Array.from(getTransferableValues(input));
}

/**
 * @param {any} input
 * @returns {Generator<Transferable>}
 */
function* getTransferableValues(input) {
  if (ArrayBuffer.isView(input)) yield input.buffer;
  if (input instanceof ArrayBuffer) yield input;

  if (input != null && typeof input === "object") {
    for (let key in input) {
      if (input.hasOwnProperty(key)) {
        yield* getTransferableValues(input[key]);
      }
    }
  }
}
