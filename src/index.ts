import {
  clearScreen,
  renderEnemies,
  renderMapGraphics,
  renderPlayerTurrets,
} from './graphics.js';
import { Enemy } from './entities/enemy.js';
import { getCanvas, getContext } from './canvas.js';
import { Position } from './pathfinding.js';
import { registerEventListeners } from './controls.js';
import { Zombie } from './entities/zombie.js';
import { Creeper } from './entities/creeper.js';
import { Level, level, loadLevel } from './levels/manager.js';
import { Turret } from './entities/turret.js';
import config from './config.js';
import { renderTileMapGrid } from './map.js';

function changeTileType(pos: Position) {
  console.log(pos);
}

// TODO: Create better state management
const enemies: Enemy[] = [];
const playerGameObjects: Turret[] = [];

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
    renderPlayerTurrets(ctx, playerGameObjects);

    if (config.debug) {
      renderTileMapGrid(ctx);
    }

    // Gameplay loop
    playGame(enemies, playerGameObjects);
  }, 1000 / config.fps);
}

// TODO: Refactor - Move to appropriate file.
function playGame(enemies: Enemy[], playerGameObjects: Turret[]) {
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    if (enemy.isDead()) {
      enemies.splice(i, 1);
      continue;
    }
    enemy.update();
  }

  for (const playerGameObject of playerGameObjects) {
    playerGameObject.update(enemies);
  }
}

function makeEnemies(level: Level) {
  enemies.push(new Zombie({ x: 1, y: 0 }, level));
  enemies.push(new Creeper({ x: 1, y: 0 }, level));
  enemies.push(new Zombie({ x: 1, y: 0 }, level));
  enemies.push(new Creeper({ x: 1, y: 0 }, level));
  enemies.push(new Zombie({ x: 1, y: 0 }, level));
}

function makePlayerGameObjects(level: Level) {
  playerGameObjects.push(new Turret({ x: 5, y: 6 }, level));
  playerGameObjects.push(new Turret({ x: 18, y: 11 }, level));
}

async function main() {
  const level = await loadLevel();

  const canvas = getCanvas();
  const context = getContext(canvas);

  makeEnemies(level);
  makePlayerGameObjects(level);

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
