import { brush } from "../modules";

export function applyBrushing(container: SVGSVGElement, dimensions: ("x" | "y")[], padding = 0) {
  let rect = container.getBoundingClientRect();
  let ctl = brush(
    [
      [padding, padding],
      [rect.width - padding, rect.height - padding],
    ],
    dimensions,
  );

  let handler = createSelection();
  container.append(handler);

  container.style.cursor = ctl.cursor();
  container.addEventListener("pointermove", function cursor(event) {
    let layerX = event.clientX - rect.left;
    let layerY = event.clientY - rect.top;
    container.style.cursor = ctl.cursor([layerX, layerY]);
  });

  container.addEventListener("pointerdown", function down(event) {
    let rect = container.getBoundingClientRect();
    let zeroX = rect.left;
    let zeroY = rect.top;

    ctl.down(event.clientX - zeroX, event.clientY - zeroY);

    function move(event: PointerEvent) {
      ctl.move(event.clientX - zeroX, event.clientY - zeroY);
      updateSelection(handler, ctl.get());
    }

    function up(event: PointerEvent) {
      ctl.up(event.clientX - zeroX, event.clientY - zeroY);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    }

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  });
}

function createSelection() {
  let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("fill", "currentColor");
  rect.setAttribute("fill-opacity", "0.3");
  rect.setAttribute("stroke", "currentColor");
  rect.style.pointerEvents = "none";
  return rect;
}

function updateSelection(element: SVGRectElement, coords: [[number, number], [number, number]]) {
  let [[x0, y0], [x1, y1]] = coords;
  element.setAttribute("x", String(x0));
  element.setAttribute("y", String(y0));
  element.setAttribute("width", String(x1 - x0));
  element.setAttribute("height", String(y1 - y0));
}
