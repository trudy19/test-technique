import { Rectangle, getRandomInt, getRandomColor } from "./rectangle";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("drawingCanvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  const repaintButton = document.getElementById(
    "repaintButton"
  ) as HTMLButtonElement;

  let rectangles: Rectangle[] = [];
  let rotatingRectangles: Rectangle[] = [];
  let isDrawing = false;
  let startX = 0;
  let startY = 0;
  let currentColor = "";

  if (!canvas || !ctx || !repaintButton) {
    console.error("Canvas or context or button not found.");
    return;
  }

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", drawRectangle);

  canvas.addEventListener("mouseup", finishDrawing);
  canvas.addEventListener("dblclick", rotateAndRemoveRectangle);
  repaintButton.addEventListener("click", repaintRectangles);

  function startDrawing(event: MouseEvent): void {
    const rect = canvas.getBoundingClientRect();
    startX = event.clientX - rect.left;
    startY = event.clientY - rect.top;

    currentColor = getRandomColor();
    isDrawing = true;
  }

  function drawRectangle(event: MouseEvent): void {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    drawAllRectangles();

    const width = x - startX;
    const height = y - startY;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = currentColor;
      ctx.strokeRect(startX, startY, width, height);
    }
  }

  function finishDrawing(event: MouseEvent): void {
    if (isDrawing) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const width = x - startX;
      const height = y - startY;

      const newRect: Rectangle = {
        x: startX,
        y: startY,
        width,
        height,
        color: currentColor,
        rotating: false,
        angle: 0,
      };
      rectangles.push(newRect);

      drawAllRectangles();

      isDrawing = false;
    }
  }

  function rotateAndRemoveRectangle(event: MouseEvent): void {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    rectangles.forEach((rect) => {
      if (
        x >= rect.x &&
        x <= rect.x + rect.width &&
        y >= rect.y &&
        y <= rect.y + rect.height &&
        !rect.rotating
      ) {
        rect.rotating = true;
        rotatingRectangles.push(rect);
        rotateRectangle(rect);
      }
    });
  }

  function rotateRectangle(rect: Rectangle): void {
    const rotateInterval = setInterval(() => {
      rect.angle += 10;
      if (rect.angle >= 360) {
        clearInterval(rotateInterval);
        rect.rotating = false;
        rect.angle = 0;
        checkAndRemoveRotatedRectangles();
      }
      drawAllRectangles();
    }, 200);
  }

  function checkAndRemoveRotatedRectangles(): void {
    if (rotatingRectangles.every((rect) => !rect.rotating)) {
      rectangles = rectangles.filter(
        (rect) => !rotatingRectangles.includes(rect)
      );
      rotatingRectangles = [];
      drawAllRectangles();
    }
  }

  function repaintRectangles(): void {
    const numRects = rectangles.length;
    if (numRects < 2) return;

    const rectsWithArea = rectangles.map((rect, index) => ({
      rect,
      area: rect.width * rect.height,
      index,
    }));

    rectsWithArea.sort((a, b) => a.area - b.area);

    let minDiff = Infinity;
    let pair: Rectangle[] = [];

    for (let i = 0; i < numRects - 1; i++) {
      const diff = rectsWithArea[i + 1].area - rectsWithArea[i].area;
      if (diff < minDiff) {
        minDiff = diff;
        pair = [rectsWithArea[i].rect, rectsWithArea[i + 1].rect];
      }
    }

    if (pair) {
      const newColor = getRandomColor();
      pair[0].color = newColor;
      pair[1].color = newColor;
      drawAllRectangles();
    }
  }

  function drawAllRectangles(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rectangles.forEach((rect) => {
      ctx.save();
      ctx.translate(rect.x + rect.width / 2, rect.y + rect.height / 2);
      ctx.rotate((rect.angle * Math.PI) / 180);
      ctx.translate(-rect.x - rect.width / 2, -rect.y - rect.height / 2);
      ctx.fillStyle = rect.color;
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
      ctx.restore();
    });
  }
});
