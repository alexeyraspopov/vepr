const FRAME_LIMIT_MS = 15;

/**
 * Receives a function that executes side effects. Keeps calling this function
 * wrapped in requestAnimationFrame() as long as the fn returns true, or there
 * is time left within appropriate non-blocking time window. Schedules following
 * animation frames if any work left after the allowed time window elapsed.
 *
 * @param {(completion: number) => boolean} performWork The function to perform
 *   any work. It receives a completion state of currently running frame as a
 *   number [0, 1).
 * @param {AbortSignal} [signal] Controlling signal that can cancel the running
 *   tasks
 */
export function workLoop(performWork, signal = { aborted: false }) {
  if (signal.aborted) return;

  requestAnimationFrame(function loop(timestamp) {
    if (signal.aborted) return;

    let shouldContinue = false;
    let elapsed = 0;

    do {
      shouldContinue = performWork(elapsed / FRAME_LIMIT_MS);
      elapsed = performance.now() - timestamp;
    } while (!signal.aborted && shouldContinue && elapsed < FRAME_LIMIT_MS);

    if (!signal.aborted && shouldContinue) {
      requestAnimationFrame(loop);
    }
  });
}
