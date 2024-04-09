let profilingEnabled = false;

let observer = new PerformanceObserver((entries) => {
  console.table(entries.getEntries().filter(selectVeprEntry), ["name", "duration"]);
});

/** @param {PerformanceEntry} entry */
function selectVeprEntry(entry) {
  return entry.name.startsWith("vepr/");
}

/** @param {boolean} enabled */
export function toggleProfiling(enabled) {
  profilingEnabled = enabled && typeof performance !== "undefined";
  if (enabled) {
    observer.observe({ entryTypes: ["measure"], durationThreshold: 5000 });
  } else {
    observer.disconnect();
  }
}

/** @param {string} name */
export function markStart(name) {
  if (profilingEnabled) {
    performance.mark("vepr/start-" + name);
  }
}

/** @param {string} name */
export function markFinish(name) {
  if (profilingEnabled) {
    performance.mark("vepr/finish-" + name);
    performance.measure("vepr/" + name, "vepr/start-" + name, "vepr/finish-" + name);
  }
}
