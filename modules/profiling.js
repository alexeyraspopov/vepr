let profilingEnabled = false;

let observer = new PerformanceObserver((list) => {
  let entries = list.getEntries().filter((entry) => entry.name.startsWith("vepr/"));
  let maxLength = entries.reduce((l, e) => Math.max(l, e.name.length - 5), 0);
  console.log(
    "%c" +
      entries
        .map(
          (entry) =>
            `| ${entry.name.slice(5).padEnd(maxLength, " ")} | ${entry.duration
              .toString()
              .padEnd(20, " ")} |`,
        )
        .join("\n"),
    "font-family: monospace",
  );
});

/** @param {boolean} enabled */
export function toggleProfiling(enabled) {
  profilingEnabled = enabled;
  if (enabled) {
    observer.observe({ entryTypes: ["measure"], durationThreshold: 5000 });
  } else {
    observer.disconnect();
  }
}

/** @param {string} name */
export function markStart(name) {
  if (!profilingEnabled) return;
  performance.mark("vepr/start-" + name);
}

/** @param {string} name */
export function markFinish(name) {
  if (!profilingEnabled) return;
  performance.mark("vepr/finish-" + name);
  performance.measure("vepr/" + name, "vepr/start-" + name, "vepr/finish-" + name);
}
