import { getCanvas, getContext } from './canvas.js';
import { renderTileMap } from './map.js';


function draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  setTimeout(() => {
    requestAnimationFrame(() => {
      draw(canvas, ctx);
    });

    // Clear everything
    clearScreen(canvas, ctx);

    // Render map
    renderTileMap(ctx);

    // Render tiles

    // Gameplay loop
  }, 1000 / 60);
}

function clearScreen(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
}

function main() {
  const canvas = getCanvas();
  const context = getContext(canvas);
  draw(canvas, context);
}

(() => {
  main();
})();
