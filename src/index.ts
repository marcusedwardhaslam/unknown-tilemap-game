import { adjustCanvasSize, getCanvas, getContext } from './canvas.js';
import { gameManager, initGameManager } from './gameManager.js';
import {
  clearScreen,
  renderEnemies,
  renderMapGraphics,
  renderPlayerTurrets,
} from './graphics.js';
import { level, loadLevel } from './levels/manager.js';
import { playGame } from './game.js';
import { renderTileMapGrid } from './debug.js';
import config from './config.js';
import { setupControls } from './controls.js';

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
    renderEnemies(ctx, gameManager.enemyGameObjects);

    // Render player game objects
    renderPlayerTurrets(ctx, gameManager.playerGameObjects);

    if (config.debug) {
      renderTileMapGrid(ctx);
    }

    // Gameplay loop
    playGame(gameManager.enemyGameObjects, gameManager.playerGameObjects);
  }, 1000 / config.fps);
}

async function main() {
  // Download level data
  const level = await loadLevel();

  // Setup canvas and context
  const canvas = getCanvas();
  adjustCanvasSize(canvas);
  const context = getContext(canvas);

  // Create game state
  initGameManager(level);

  // Setup controls
  setupControls(canvas);

  // Initial draw
  draw(canvas, context);
}

(() => {
  main()
    .then(() => console.log('All loaded'))
    .catch(console.error);
})();
