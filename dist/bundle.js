/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/rectangle.ts":
/*!**************************!*\
  !*** ./src/rectangle.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRandomColor: () => (/* binding */ getRandomColor),
/* harmony export */   getRandomInt: () => (/* binding */ getRandomInt)
/* harmony export */ });
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rectangle */ "./src/rectangle.ts");

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("drawingCanvas");
    const ctx = canvas.getContext("2d");
    const repaintButton = document.getElementById("repaintButton");
    let rectangles = [];
    let rotatingRectangles = [];
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
    function startDrawing(event) {
        const rect = canvas.getBoundingClientRect();
        startX = event.clientX - rect.left;
        startY = event.clientY - rect.top;
        currentColor = (0,_rectangle__WEBPACK_IMPORTED_MODULE_0__.getRandomColor)();
        isDrawing = true;
    }
    function drawRectangle(event) {
        if (!isDrawing)
            return;
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
    function finishDrawing(event) {
        if (isDrawing) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const width = x - startX;
            const height = y - startY;
            const newRect = {
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
    function rotateAndRemoveRectangle(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        rectangles.forEach((rect) => {
            if (x >= rect.x &&
                x <= rect.x + rect.width &&
                y >= rect.y &&
                y <= rect.y + rect.height &&
                !rect.rotating) {
                rect.rotating = true;
                rotatingRectangles.push(rect);
                rotateRectangle(rect);
            }
        });
    }
    function rotateRectangle(rect) {
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
    function checkAndRemoveRotatedRectangles() {
        if (rotatingRectangles.every((rect) => !rect.rotating)) {
            rectangles = rectangles.filter((rect) => !rotatingRectangles.includes(rect));
            rotatingRectangles = [];
            drawAllRectangles();
        }
    }
    function repaintRectangles() {
        const numRects = rectangles.length;
        if (numRects < 2)
            return;
        const rectsWithArea = rectangles.map((rect, index) => ({
            rect,
            area: rect.width * rect.height,
            index,
        }));
        rectsWithArea.sort((a, b) => a.area - b.area);
        let minDiff = Infinity;
        let pair = [];
        for (let i = 0; i < numRects - 1; i++) {
            const diff = rectsWithArea[i + 1].area - rectsWithArea[i].area;
            if (diff < minDiff) {
                minDiff = diff;
                pair = [rectsWithArea[i].rect, rectsWithArea[i + 1].rect];
            }
        }
        if (pair) {
            const newColor = (0,_rectangle__WEBPACK_IMPORTED_MODULE_0__.getRandomColor)();
            pair[0].color = newColor;
            pair[1].color = newColor;
            drawAllRectangles();
        }
    }
    function drawAllRectangles() {
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDVkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7QUNONkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwwREFBYztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsMERBQWM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Rlc3QtdHlwZXNjcmlwdC12Mi8uL3NyYy9yZWN0YW5nbGUudHMiLCJ3ZWJwYWNrOi8vdGVzdC10eXBlc2NyaXB0LXYyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Rlc3QtdHlwZXNjcmlwdC12Mi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGVzdC10eXBlc2NyaXB0LXYyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdGVzdC10eXBlc2NyaXB0LXYyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdGVzdC10eXBlc2NyaXB0LXYyLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21JbnQobWluLCBtYXgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21Db2xvcigpIHtcbiAgICBjb25zdCBsZXR0ZXJzID0gXCIwMTIzNDU2Nzg5QUJDREVGXCI7XG4gICAgbGV0IGNvbG9yID0gXCIjXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgY29sb3IgKz0gbGV0dGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNildO1xuICAgIH1cbiAgICByZXR1cm4gY29sb3I7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdldFJhbmRvbUNvbG9yIH0gZnJvbSBcIi4vcmVjdGFuZ2xlXCI7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkcmF3aW5nQ2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3QgcmVwYWludEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVwYWludEJ1dHRvblwiKTtcbiAgICBsZXQgcmVjdGFuZ2xlcyA9IFtdO1xuICAgIGxldCByb3RhdGluZ1JlY3RhbmdsZXMgPSBbXTtcbiAgICBsZXQgaXNEcmF3aW5nID0gZmFsc2U7XG4gICAgbGV0IHN0YXJ0WCA9IDA7XG4gICAgbGV0IHN0YXJ0WSA9IDA7XG4gICAgbGV0IGN1cnJlbnRDb2xvciA9IFwiXCI7XG4gICAgaWYgKCFjYW52YXMgfHwgIWN0eCB8fCAhcmVwYWludEJ1dHRvbikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2FudmFzIG9yIGNvbnRleHQgb3IgYnV0dG9uIG5vdCBmb3VuZC5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgc3RhcnREcmF3aW5nKTtcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBkcmF3UmVjdGFuZ2xlKTtcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZmluaXNoRHJhd2luZyk7XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCByb3RhdGVBbmRSZW1vdmVSZWN0YW5nbGUpO1xuICAgIHJlcGFpbnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlcGFpbnRSZWN0YW5nbGVzKTtcbiAgICBmdW5jdGlvbiBzdGFydERyYXdpbmcoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgc3RhcnRYID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgc3RhcnRZID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICBjdXJyZW50Q29sb3IgPSBnZXRSYW5kb21Db2xvcigpO1xuICAgICAgICBpc0RyYXdpbmcgPSB0cnVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkcmF3UmVjdGFuZ2xlKGV2ZW50KSB7XG4gICAgICAgIGlmICghaXNEcmF3aW5nKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCB4ID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgY29uc3QgeSA9IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgICAgZHJhd0FsbFJlY3RhbmdsZXMoKTtcbiAgICAgICAgY29uc3Qgd2lkdGggPSB4IC0gc3RhcnRYO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSB5IC0gc3RhcnRZO1xuICAgICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICBpZiAoY3R4KSB7XG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjdXJyZW50Q29sb3I7XG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdChzdGFydFgsIHN0YXJ0WSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZmluaXNoRHJhd2luZyhldmVudCkge1xuICAgICAgICBpZiAoaXNEcmF3aW5nKSB7XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgY29uc3QgeCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICAgICAgICBjb25zdCB5ID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSB4IC0gc3RhcnRYO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0geSAtIHN0YXJ0WTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1JlY3QgPSB7XG4gICAgICAgICAgICAgICAgeDogc3RhcnRYLFxuICAgICAgICAgICAgICAgIHk6IHN0YXJ0WSxcbiAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICAgICAgY29sb3I6IGN1cnJlbnRDb2xvcixcbiAgICAgICAgICAgICAgICByb3RhdGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgYW5nbGU6IDAsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVjdGFuZ2xlcy5wdXNoKG5ld1JlY3QpO1xuICAgICAgICAgICAgZHJhd0FsbFJlY3RhbmdsZXMoKTtcbiAgICAgICAgICAgIGlzRHJhd2luZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJvdGF0ZUFuZFJlbW92ZVJlY3RhbmdsZShldmVudCkge1xuICAgICAgICBjb25zdCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCB4ID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgY29uc3QgeSA9IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgICAgcmVjdGFuZ2xlcy5mb3JFYWNoKChyZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoeCA+PSByZWN0LnggJiZcbiAgICAgICAgICAgICAgICB4IDw9IHJlY3QueCArIHJlY3Qud2lkdGggJiZcbiAgICAgICAgICAgICAgICB5ID49IHJlY3QueSAmJlxuICAgICAgICAgICAgICAgIHkgPD0gcmVjdC55ICsgcmVjdC5oZWlnaHQgJiZcbiAgICAgICAgICAgICAgICAhcmVjdC5yb3RhdGluZykge1xuICAgICAgICAgICAgICAgIHJlY3Qucm90YXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJvdGF0aW5nUmVjdGFuZ2xlcy5wdXNoKHJlY3QpO1xuICAgICAgICAgICAgICAgIHJvdGF0ZVJlY3RhbmdsZShyZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJvdGF0ZVJlY3RhbmdsZShyZWN0KSB7XG4gICAgICAgIGNvbnN0IHJvdGF0ZUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgcmVjdC5hbmdsZSArPSAxMDtcbiAgICAgICAgICAgIGlmIChyZWN0LmFuZ2xlID49IDM2MCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocm90YXRlSW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgIHJlY3Qucm90YXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZWN0LmFuZ2xlID0gMDtcbiAgICAgICAgICAgICAgICBjaGVja0FuZFJlbW92ZVJvdGF0ZWRSZWN0YW5nbGVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkcmF3QWxsUmVjdGFuZ2xlcygpO1xuICAgICAgICB9LCAyMDApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja0FuZFJlbW92ZVJvdGF0ZWRSZWN0YW5nbGVzKCkge1xuICAgICAgICBpZiAocm90YXRpbmdSZWN0YW5nbGVzLmV2ZXJ5KChyZWN0KSA9PiAhcmVjdC5yb3RhdGluZykpIHtcbiAgICAgICAgICAgIHJlY3RhbmdsZXMgPSByZWN0YW5nbGVzLmZpbHRlcigocmVjdCkgPT4gIXJvdGF0aW5nUmVjdGFuZ2xlcy5pbmNsdWRlcyhyZWN0KSk7XG4gICAgICAgICAgICByb3RhdGluZ1JlY3RhbmdsZXMgPSBbXTtcbiAgICAgICAgICAgIGRyYXdBbGxSZWN0YW5nbGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVwYWludFJlY3RhbmdsZXMoKSB7XG4gICAgICAgIGNvbnN0IG51bVJlY3RzID0gcmVjdGFuZ2xlcy5sZW5ndGg7XG4gICAgICAgIGlmIChudW1SZWN0cyA8IDIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHJlY3RzV2l0aEFyZWEgPSByZWN0YW5nbGVzLm1hcCgocmVjdCwgaW5kZXgpID0+ICh7XG4gICAgICAgICAgICByZWN0LFxuICAgICAgICAgICAgYXJlYTogcmVjdC53aWR0aCAqIHJlY3QuaGVpZ2h0LFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmVjdHNXaXRoQXJlYS5zb3J0KChhLCBiKSA9PiBhLmFyZWEgLSBiLmFyZWEpO1xuICAgICAgICBsZXQgbWluRGlmZiA9IEluZmluaXR5O1xuICAgICAgICBsZXQgcGFpciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVJlY3RzIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkaWZmID0gcmVjdHNXaXRoQXJlYVtpICsgMV0uYXJlYSAtIHJlY3RzV2l0aEFyZWFbaV0uYXJlYTtcbiAgICAgICAgICAgIGlmIChkaWZmIDwgbWluRGlmZikge1xuICAgICAgICAgICAgICAgIG1pbkRpZmYgPSBkaWZmO1xuICAgICAgICAgICAgICAgIHBhaXIgPSBbcmVjdHNXaXRoQXJlYVtpXS5yZWN0LCByZWN0c1dpdGhBcmVhW2kgKyAxXS5yZWN0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocGFpcikge1xuICAgICAgICAgICAgY29uc3QgbmV3Q29sb3IgPSBnZXRSYW5kb21Db2xvcigpO1xuICAgICAgICAgICAgcGFpclswXS5jb2xvciA9IG5ld0NvbG9yO1xuICAgICAgICAgICAgcGFpclsxXS5jb2xvciA9IG5ld0NvbG9yO1xuICAgICAgICAgICAgZHJhd0FsbFJlY3RhbmdsZXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBkcmF3QWxsUmVjdGFuZ2xlcygpIHtcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICByZWN0YW5nbGVzLmZvckVhY2goKHJlY3QpID0+IHtcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKHJlY3QueCArIHJlY3Qud2lkdGggLyAyLCByZWN0LnkgKyByZWN0LmhlaWdodCAvIDIpO1xuICAgICAgICAgICAgY3R4LnJvdGF0ZSgocmVjdC5hbmdsZSAqIE1hdGguUEkpIC8gMTgwKTtcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoLXJlY3QueCAtIHJlY3Qud2lkdGggLyAyLCAtcmVjdC55IC0gcmVjdC5oZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSByZWN0LmNvbG9yO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHJlY3QueCwgcmVjdC55LCByZWN0LndpZHRoLCByZWN0LmhlaWdodCk7XG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==