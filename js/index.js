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
import { clearScreen, renderEnemies, renderMapGraphics, renderPlayerTurrets, } from './graphics.js';
import { level, loadLevel } from './levels/manager.js';
import { playGame } from './game.js';
import { registerEventListeners } from './controls.js';
import { renderTileMapGrid } from './debug.js';
import config from './config.js';
function changeTileType(pos) {
    console.log(pos);
}
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
        // Gameplay loop
        playGame(gameManager.enemyGameObjects, gameManager.playerGameObjects);
    }, 1000 / config.fps);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const level = yield loadLevel();
        const canvas = getCanvas();
        adjustCanvasSize(canvas);
        const context = getContext(canvas);
        initGameManager(level);
        registerEventListeners(canvas, {
            click: changeTileType,
        });
        draw(canvas, context);
    });
}
(() => {
    main()
        .then(() => console.log('All loaded'))
        .catch(console.error);
})();
