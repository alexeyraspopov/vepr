import { Linear, descending, render, blueprint, identity, dot, line, barY, barX } from "../modules";

export function lifecycle(fn: Function) {
  let cleanup: Function | undefined;
  document.addEventListener("DOMContentLoaded", () => {
    cleanup = fn();
  });
  window.addEventListener("beforeunload", () => {
    if (typeof cleanup === "function") cleanup();
  });
}

export function sampleDotPlot(container: HTMLElement) {
  type SampleRecord = { propA: number; propB: number };

  let randA = Linear([0, 1], [-50, 50]);
  let randB = Linear([0, 1], [0, 100]);
  let data = Array.from({ length: 10000 }, () => ({
    propA: randA(Math.random()),
    propB: randB(Math.random()) | 0,
  }));

  let predicate = (d: SampleRecord) =>
    ((d.propB >= 10 && d.propB <= 20) ||
      (d.propB >= 40 && d.propB <= 50) ||
      (d.propB >= 60 && d.propB <= 80)) &&
    d.propA >= -25 &&
    d.propA <= 25;

  let bp = blueprint({
    marks: [dot(data, identity({ x: "propB", y: "propA" }, { filter: predicate }))],
  });

  return render(bp, container);
}

export function sampleLinePlot(container: HTMLElement) {
  let data = Array.from({ length: 1000 }, (_, index) => index).reduce((acc, index) => {
    return acc.concat({
      index,
      value: index === 0 ? Math.random() * 100 : acc[acc.length - 1].value + Math.random() * 10 - 5,
    });
  }, [] as { index: number; value: number }[]);

  let bp = blueprint({
    y: { type: "q", domain: [0, 150] },
    marks: [line(data, identity({ x: "index", y: "value" }))],
  });

  return render(bp, container);
}

export function sampleBarPlot(container: HTMLElement, flow: "x" | "y") {
  type SampleRecord = { letter: string; frequency: number };

  let data = [
    { letter: "A", frequency: Math.random() * 10 },
    { letter: "B", frequency: Math.random() * 10 },
    { letter: "C", frequency: Math.random() * 10 },
    { letter: "D", frequency: Math.random() * 10 },
    { letter: "E", frequency: Math.random() * 10 },
  ];

  let order = (a: SampleRecord, b: SampleRecord) => descending(a.frequency, b.frequency);

  let bp =
    flow === "y"
      ? blueprint({
          y: { type: "q", domain: [0, 13] },
          marks: [barY(data, identity({ x: "letter", y: "frequency" }, { sort: order }))],
        })
      : blueprint({
          x: { type: "q", domain: [0, 13] },
          marks: [barX(data, identity({ x: "frequency", y: "letter" }, { sort: order }))],
        });

  return render(bp, container);
}
