import { brush, zoom } from "../modules";

export function applyBrushing(container: HTMLElement, dimensions: "x" | "y" | "xy", padding = 0) {
  let ctl = brush(dimensions);
  let handler = createSelection();
  container.append(handler);

  function conf() {
    let rect = container.getBoundingClientRect();
    ctl.extent([
      [padding, padding],
      [rect.width - padding, rect.height - padding],
    ]);
  }

  conf();

  function down(event: Event) {
    let { offsetX, offsetY, pointerId } = event as PointerEvent;
    conf();
    ctl.down(offsetX, offsetY);
    container.setPointerCapture(pointerId);
  }

  function move(event: Event) {
    let { offsetX, offsetY } = event as PointerEvent;
    if (ctl.idle()) {
      container.style.cursor = ctl.cursor(offsetX, offsetY);
    } else {
      ctl.move(offsetX, offsetY);
      updateSelection(handler, ctl.get());
    }
  }

  function up(event: Event) {
    let { offsetX, offsetY, pointerId } = event as PointerEvent;
    ctl.up(offsetX, offsetY);
    container.releasePointerCapture(pointerId);
  }

  container.addEventListener("pointerdown", down);
  container.addEventListener("pointermove", move);
  container.addEventListener("pointerup", up);
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

export function applyZooming(container: HTMLElement) {
  let rect = container.getBoundingClientRect();
  let ctl = zoom(
    [
      [0, 0],
      [rect.width, rect.height],
    ],
    [0.5, 6],
  );

  let ctx = prepareCanvas(container as HTMLCanvasElement);
  renderCanvas(ctx, ctl.get());

  container.addEventListener("wheel", function wheel(event) {
    event.preventDefault();

    let delta =
      -event.deltaY *
      (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) *
      (event.ctrlKey ? 10 : 1);

    ctl.scale(2 ** delta);
    renderCanvas(ctx, ctl.get());
  });

  container.addEventListener("pointerdown", function down(event) {
    let rect = container.getBoundingClientRect();
    let zeroX = rect.left;
    let zeroY = rect.top;

    ctl.down(event.clientX - zeroX, event.clientY - zeroY);

    function move(event: PointerEvent) {
      ctl.move(event.clientX - zeroX, event.clientY - zeroY);
      renderCanvas(ctx, ctl.get());
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

function prepareCanvas(canvas: HTMLCanvasElement) {
  let ctx = canvas.getContext("2d")!;
  let rect = canvas.getBoundingClientRect();
  let dpr = window.devicePixelRatio;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  return ctx;
}

function renderCanvas(context: CanvasRenderingContext2D, transform: any) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  let points: [number, number][] = [
    [200, 200],
    [255, 215],
    [250, 250],
  ];
  let [_k, _x, _y] = transform;
  console.log(_k);
  let apply = ([x, y]: [number, number]) => [x * _k + _x, y * _k + _y];
  for (let point of points) {
    let [x, y] = apply(point);
    context.beginPath();
    context.arc(x, y, 6, 0, Math.PI * 2);
    context.lineWidth = 4;
    context.strokeStyle = "red";
    context.stroke();
    context.closePath();
  }
  let p1 = apply([10, 10]);
  let p2 = apply([context.canvas.width / 2 - 10, context.canvas.height / 2 - 10]);
  context.strokeRect(p1[0], p1[1], p2[0] - p1[0], p2[1] - p1[1]);
}
