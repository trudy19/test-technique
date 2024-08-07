
  import { Rectangle,getRandomInt,getRandomColor } from './rectangle';
 
  document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("drawingCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    const repaintButton = document.getElementById("repaintButton") as HTMLButtonElement;
  
    let rectangles: Rectangle[] = [];
    let rotatingRectangles: Rectangle[] = [];
  
    if (!canvas || !ctx || !repaintButton) {
      console.error("Canvas or context or button not found.");
      return;
    }
  
    canvas.addEventListener("mousedown", drawRectangle);
    canvas.addEventListener("dblclick", rotateAndRemoveRectangle);
    repaintButton.addEventListener("click", repaintRectangles);
  
    function drawRectangle(event: MouseEvent): void {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
  
      if (isMouseOnRectangle(x, y)) {
        return;
      }
  
      const width = getRandomInt(30, 100);
      const height = getRandomInt(30, 100);
      const color = getRandomColor();
  
      const newRect: Rectangle = { x, y, width, height, color, rotating: false, angle: 0 };
      rectangles.push(newRect);
  
      drawAllRectangles();
    }
  
    function isMouseOnRectangle(x: number, y: number): boolean {
      return rectangles.some(
        (rect) =>
          x >= rect.x &&
          x <= rect.x + rect.width &&
          y >= rect.y &&
          y <= rect.y + rect.height
      );
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
      if (rectangles.length < 2) return;
  
      let minDiff = canvas.width * canvas.height;
      let pair: Rectangle[] = [];
      const areas = rectangles.map((rect) => rect.width * rect.height);
  
      for (let i = 0; i < rectangles.length - 1; i++) {
        for (let j = i + 1; j < rectangles.length; j++) {
          const diff = Math.abs(areas[i] - areas[j]);
  
          if (diff < minDiff) {
            minDiff = diff;
            pair = [rectangles[i], rectangles[j]];
          }
        }
      }
  
      const newColor = getRandomColor();
      pair.forEach((rect) => {
        rect.color = newColor;
      });
      drawAllRectangles();
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
  