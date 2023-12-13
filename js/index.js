var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { adjustCanvasSize, getCanvas, getContext } from './canvas.js';
import { gameManager, initGameManager } from './gameManager.js';
import { clearScreen, renderEnemies, renderMapGraphics, renderPlayerTurrets, renderUserInterface, } from './graphics.js';
import { level, loadLevel } from './levels/manager.js';
import { playGame } from './game.js';
import { renderTileMapGrid } from './debug.js';
import config from './config.js';
import { setupControls } from './controls.js';
function draw(canvas, ctx) {
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
        renderUserInterface(canvas, ctx);
        // Gameplay loop
        playGame(gameManager.enemyGameObjects, gameManager.playerGameObjects);
    }, 1000 / config.fps);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Download level data
        const level = yield loadLevel();
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
    });
}
(() => {
    main()
        .then(() => console.log('All loaded'))
        .catch(console.error);
})();
