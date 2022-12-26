import { getCanvas, getContext } from './canvas.js';
import { registerEventListeners } from './controls.js';
import { renderMapGraphics } from './graphics.js';
import { renderTileMap, TILE_SIZE } from './map.js';
import { level } from './levels/2.js';
import { TileType } from './tile.js';
import { aStar } from './pathfinding.js';

function changeTileType({row, column}: {row: number, column: number}) {
  const tile = level[row][column];
  const currentType = tile.getType();

  switch(currentType) {
    case TileType.GRASS:
      tile.setType(TileType.SAND);
      break;
    case TileType.SAND:
      tile.setType(TileType.START);
      break;
    case TileType.START:
      tile.setType(TileType.GOAL);
      break;
    case TileType.GOAL:
      tile.setType(TileType.GRASS);
      break;
    default:
      break;
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
    renderMapGraphics(level, ctx);

    // Render map (we want this on top of the tiles)
    renderTileMap(ctx);

    const route = aStar(level, {
      x: 1,
      y: 0,
    }, {
      x: 31,
      y: 18,
    });

    renderRoute(ctx, route.map(node => ({
      x: node.x,
      y: node.y,
    })));
    // Gameplay loop
  }, 1000 / 60);
}

function renderRoute(ctx: CanvasRenderingContext2D, route: {x: number, y: number}[]) {
  console.log(route);
  for (const node of route) {
    const { x, y } = node;
    ctx.fillStyle = '#94faff';
    ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
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
  }, level);
  draw(canvas, context);
}

(() => {
  main();
})();
