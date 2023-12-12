/**
 * Collect references to transferable objects within nested data structure.
 *
 * @param {any} input Any nested data structure to collect transferables from
 * @returns {Transferable[]} A collection of transferable refs
 * @link https://developer.mozilla.org/en-US/docs/Glossary/Transferable_objects
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

  // prettier-ignore
  if (input != null && typeof input === "object" && !Array.isArray(input))
    for (let key in input)
      if (input.hasOwnProperty(key))
        yield* getTransferableValues(input[key]);
}
