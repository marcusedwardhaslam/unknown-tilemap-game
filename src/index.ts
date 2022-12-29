import { clearScreen, renderEnemies, renderMapGraphics } from './graphics.js';
import { Enemy } from './entities/enemy.js';
import { getCanvas, getContext } from './canvas.js';
import { Position } from './pathfinding.js';
import { registerEventListeners } from './controls.js';
import { Zombie } from './entities/zombie.js';
import { Creeper } from './entities/creeper.js';
import { Level, level, loadLevel } from './levels/manager.js';
import { renderTileMapGrid } from './map.js';

function changeTileType(pos: Position) {
  console.log(pos);
}

const enemies: Enemy[] = [];

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

function makeEnemies(level: Level) {
  enemies.push(new Zombie({ x: 1, y: 0 }, level));
  enemies.push(new Creeper({ x: 1, y: 0 }, level));
}

async function main() {
  const level = await loadLevel();

  const canvas = getCanvas();
  const context = getContext(canvas);

  makeEnemies(level);

  registerEventListeners(canvas, {
    click: changeTileType,
  });

  draw(canvas, context);
}

(() => {
  main()
    .then(() => console.log('All loaded'))
    .catch(console.error);
})();
