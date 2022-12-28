import { clearScreen, renderEnemies, renderMapGraphics } from './graphics.js';
import { Enemy } from './entities/enemy.js';
import { getCanvas, getContext } from './canvas.js';
import { level } from './levels/1.js';
import { Position } from './pathfinding.js';
import { registerEventListeners } from './controls.js';
import { renderTileMapGrid } from './map.js';
import { Zombie } from './entities/zombie.js';
import { Creeper } from './entities/creeper.js';

function changeTileType(pos: Position) {
  console.log(pos);
}

const enemies: Enemy[] = [
  new Zombie({ x: 1, y: 0 }),
  new Creeper({ x: 1, y: 0 }),
];

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

    // // Render tile map grid(we want this on top of the tiles)
    // renderTileMapGrid(ctx);

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
    click: changeTileType,
  });
  draw(canvas, context);
}

(() => {
  main();
})();
