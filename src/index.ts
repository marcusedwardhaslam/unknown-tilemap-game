import { getCanvas, getContext } from './canvas.js';
import { registerEventListeners } from './controls.js';
import { renderMapGraphics } from './graphics.js';
import { renderTileMap } from './map.js';
import { Tile } from './tile.js';

const MAP_STATE = [
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
  [new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'), new Tile('#9ECB91'),new Tile('#9ECB91'),new Tile('#9ECB91')],
];

function changeTileType({row, column}: {row: number, column: number}) {
  const tile = MAP_STATE[row][column];
  const currentColour = tile.getColour();

  if (currentColour === '#9ECB91') {
    tile.setColour('#9B7653');
  } else {
    tile.setColour('#9ECB91');
  }
}

function draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  setTimeout(() => {
    requestAnimationFrame(() => {
      draw(canvas, ctx);
    });

    // Clear everything
    clearScreen(canvas, ctx);

    // Render tiles
    renderMapGraphics(MAP_STATE, ctx);

    // Render map (we want this on top of the tiles)
    renderTileMap(ctx);

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
  registerEventListeners(canvas, {
    'click': changeTileType,
  });
  draw(canvas, context);
}

(() => {
  main();
})();
