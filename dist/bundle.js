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
    if (!canvas || !ctx || !repaintButton) {
        console.error("Canvas or context or button not found.");
        return;
    }
    canvas.addEventListener("mousedown", drawRectangle);
    canvas.addEventListener("dblclick", rotateAndRemoveRectangle);
    repaintButton.addEventListener("click", repaintRectangles);
    function drawRectangle(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (isMouseOnRectangle(x, y)) {
            return;
        }
        const width = (0,_rectangle__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(30, 100);
        const height = (0,_rectangle__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(30, 100);
        const color = (0,_rectangle__WEBPACK_IMPORTED_MODULE_0__.getRandomColor)();
        const newRect = { x, y, width, height, color, rotating: false, angle: 0 };
        rectangles.push(newRect);
        drawAllRectangles();
    }
    function isMouseOnRectangle(x, y) {
        return rectangles.some((rect) => x >= rect.x &&
            x <= rect.x + rect.width &&
            y >= rect.y &&
            y <= rect.y + rect.height);
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
        if (rectangles.length < 2)
            return;
        let minDiff = canvas.width * canvas.height;
        let pair = [];
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
        const newColor = (0,_rectangle__WEBPACK_IMPORTED_MODULE_0__.getRandomColor)();
        pair.forEach((rect) => {
            rect.color = newColor;
        });
        drawAllRectangles();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDVkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7QUNOMkQ7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix3REFBWTtBQUNsQyx1QkFBdUIsd0RBQVk7QUFDbkMsc0JBQXNCLDBEQUFjO0FBQ3BDLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwyQkFBMkI7QUFDbkQsZ0NBQWdDLHVCQUF1QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QiwwREFBYztBQUN2QztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0LXR5cGVzY3JpcHQtdjIvLi9zcmMvcmVjdGFuZ2xlLnRzIiwid2VicGFjazovL3Rlc3QtdHlwZXNjcmlwdC12Mi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90ZXN0LXR5cGVzY3JpcHQtdjIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Rlc3QtdHlwZXNjcmlwdC12Mi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Rlc3QtdHlwZXNjcmlwdC12Mi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Rlc3QtdHlwZXNjcmlwdC12Mi8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tQ29sb3IoKSB7XG4gICAgY29uc3QgbGV0dGVycyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiO1xuICAgIGxldCBjb2xvciA9IFwiI1wiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgIGNvbG9yICs9IGxldHRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnZXRSYW5kb21JbnQsIGdldFJhbmRvbUNvbG9yIH0gZnJvbSAnLi9yZWN0YW5nbGUnO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJhd2luZ0NhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IHJlcGFpbnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlcGFpbnRCdXR0b25cIik7XG4gICAgbGV0IHJlY3RhbmdsZXMgPSBbXTtcbiAgICBsZXQgcm90YXRpbmdSZWN0YW5nbGVzID0gW107XG4gICAgaWYgKCFjYW52YXMgfHwgIWN0eCB8fCAhcmVwYWludEJ1dHRvbikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2FudmFzIG9yIGNvbnRleHQgb3IgYnV0dG9uIG5vdCBmb3VuZC5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZHJhd1JlY3RhbmdsZSk7XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCByb3RhdGVBbmRSZW1vdmVSZWN0YW5nbGUpO1xuICAgIHJlcGFpbnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlcGFpbnRSZWN0YW5nbGVzKTtcbiAgICBmdW5jdGlvbiBkcmF3UmVjdGFuZ2xlKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IHggPSBldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgICBjb25zdCB5ID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICBpZiAoaXNNb3VzZU9uUmVjdGFuZ2xlKHgsIHkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgd2lkdGggPSBnZXRSYW5kb21JbnQoMzAsIDEwMCk7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IGdldFJhbmRvbUludCgzMCwgMTAwKTtcbiAgICAgICAgY29uc3QgY29sb3IgPSBnZXRSYW5kb21Db2xvcigpO1xuICAgICAgICBjb25zdCBuZXdSZWN0ID0geyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvciwgcm90YXRpbmc6IGZhbHNlLCBhbmdsZTogMCB9O1xuICAgICAgICByZWN0YW5nbGVzLnB1c2gobmV3UmVjdCk7XG4gICAgICAgIGRyYXdBbGxSZWN0YW5nbGVzKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTW91c2VPblJlY3RhbmdsZSh4LCB5KSB7XG4gICAgICAgIHJldHVybiByZWN0YW5nbGVzLnNvbWUoKHJlY3QpID0+IHggPj0gcmVjdC54ICYmXG4gICAgICAgICAgICB4IDw9IHJlY3QueCArIHJlY3Qud2lkdGggJiZcbiAgICAgICAgICAgIHkgPj0gcmVjdC55ICYmXG4gICAgICAgICAgICB5IDw9IHJlY3QueSArIHJlY3QuaGVpZ2h0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcm90YXRlQW5kUmVtb3ZlUmVjdGFuZ2xlKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IHggPSBldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgICBjb25zdCB5ID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICByZWN0YW5nbGVzLmZvckVhY2goKHJlY3QpID0+IHtcbiAgICAgICAgICAgIGlmICh4ID49IHJlY3QueCAmJlxuICAgICAgICAgICAgICAgIHggPD0gcmVjdC54ICsgcmVjdC53aWR0aCAmJlxuICAgICAgICAgICAgICAgIHkgPj0gcmVjdC55ICYmXG4gICAgICAgICAgICAgICAgeSA8PSByZWN0LnkgKyByZWN0LmhlaWdodCAmJlxuICAgICAgICAgICAgICAgICFyZWN0LnJvdGF0aW5nKSB7XG4gICAgICAgICAgICAgICAgcmVjdC5yb3RhdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgcm90YXRpbmdSZWN0YW5nbGVzLnB1c2gocmVjdCk7XG4gICAgICAgICAgICAgICAgcm90YXRlUmVjdGFuZ2xlKHJlY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcm90YXRlUmVjdGFuZ2xlKHJlY3QpIHtcbiAgICAgICAgY29uc3Qgcm90YXRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICByZWN0LmFuZ2xlICs9IDEwO1xuICAgICAgICAgICAgaWYgKHJlY3QuYW5nbGUgPj0gMzYwKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyb3RhdGVJbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgcmVjdC5yb3RhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJlY3QuYW5nbGUgPSAwO1xuICAgICAgICAgICAgICAgIGNoZWNrQW5kUmVtb3ZlUm90YXRlZFJlY3RhbmdsZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRyYXdBbGxSZWN0YW5nbGVzKCk7XG4gICAgICAgIH0sIDIwMCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrQW5kUmVtb3ZlUm90YXRlZFJlY3RhbmdsZXMoKSB7XG4gICAgICAgIGlmIChyb3RhdGluZ1JlY3RhbmdsZXMuZXZlcnkoKHJlY3QpID0+ICFyZWN0LnJvdGF0aW5nKSkge1xuICAgICAgICAgICAgcmVjdGFuZ2xlcyA9IHJlY3RhbmdsZXMuZmlsdGVyKChyZWN0KSA9PiAhcm90YXRpbmdSZWN0YW5nbGVzLmluY2x1ZGVzKHJlY3QpKTtcbiAgICAgICAgICAgIHJvdGF0aW5nUmVjdGFuZ2xlcyA9IFtdO1xuICAgICAgICAgICAgZHJhd0FsbFJlY3RhbmdsZXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiByZXBhaW50UmVjdGFuZ2xlcygpIHtcbiAgICAgICAgaWYgKHJlY3RhbmdsZXMubGVuZ3RoIDwgMilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0IG1pbkRpZmYgPSBjYW52YXMud2lkdGggKiBjYW52YXMuaGVpZ2h0O1xuICAgICAgICBsZXQgcGFpciA9IFtdO1xuICAgICAgICBjb25zdCBhcmVhcyA9IHJlY3RhbmdsZXMubWFwKChyZWN0KSA9PiByZWN0LndpZHRoICogcmVjdC5oZWlnaHQpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlY3RhbmdsZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCByZWN0YW5nbGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlmZiA9IE1hdGguYWJzKGFyZWFzW2ldIC0gYXJlYXNbal0pO1xuICAgICAgICAgICAgICAgIGlmIChkaWZmIDwgbWluRGlmZikge1xuICAgICAgICAgICAgICAgICAgICBtaW5EaWZmID0gZGlmZjtcbiAgICAgICAgICAgICAgICAgICAgcGFpciA9IFtyZWN0YW5nbGVzW2ldLCByZWN0YW5nbGVzW2pdXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3Q29sb3IgPSBnZXRSYW5kb21Db2xvcigpO1xuICAgICAgICBwYWlyLmZvckVhY2goKHJlY3QpID0+IHtcbiAgICAgICAgICAgIHJlY3QuY29sb3IgPSBuZXdDb2xvcjtcbiAgICAgICAgfSk7XG4gICAgICAgIGRyYXdBbGxSZWN0YW5nbGVzKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRyYXdBbGxSZWN0YW5nbGVzKCkge1xuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHJlY3RhbmdsZXMuZm9yRWFjaCgocmVjdCkgPT4ge1xuICAgICAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUocmVjdC54ICsgcmVjdC53aWR0aCAvIDIsIHJlY3QueSArIHJlY3QuaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICBjdHgucm90YXRlKChyZWN0LmFuZ2xlICogTWF0aC5QSSkgLyAxODApO1xuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSgtcmVjdC54IC0gcmVjdC53aWR0aCAvIDIsIC1yZWN0LnkgLSByZWN0LmhlaWdodCAvIDIpO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHJlY3QuY29sb3I7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QocmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9