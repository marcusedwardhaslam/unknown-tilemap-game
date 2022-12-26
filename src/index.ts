import { getCanvas, getContext } from './canvas.js';
import { registerEventListeners } from './controls.js';
import { clearScreen, renderEnemies, renderMapGraphics } from './graphics.js';
import { renderTileMapGrid } from './map.js';
import { level } from './levels/1.js';
import { TileType } from './tile.js';
import { Enemy } from './entities/enemy.js';

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

const enemies: Enemy[] = [new Enemy(1, 0)];

function draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  setTimeout(() => {
    requestAnimationFrame(() => {
      draw(canvas, ctx);
    });

    // Clear everything
    clearScreen(canvas, ctx);

    // Render tiles
    renderMapGraphics(level, ctx);

    // Render enemy game objects
    renderEnemies(ctx, enemies);

    // Render player game objects

    // Render tile map grid(we want this on top of the tiles)
    renderTileMapGrid(ctx);

    // Gameplay loop
    playGame(enemies);
  }, 1000 / 60);
}

// TODO: Refactor - Move to appropriate file.
function playGame(enemies: Enemy[]) {
  for (const enemy of enemies) {
    enemy.update();
  }
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
