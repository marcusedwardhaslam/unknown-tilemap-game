var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { clearScreen, renderEnemies, renderMapGraphics, renderPlayerTurrets, } from './graphics.js';
import { adjustCanvasSize, getCanvas, getContext } from './canvas.js';
import { registerEventListeners } from './controls.js';
import { Zombie } from './entities/zombie.js';
import { Creeper } from './entities/creeper.js';
import { level, loadLevel } from './levels/manager.js';
import { Turret } from './entities/turret.js';
import config from './config.js';
import { renderTileMapGrid } from './map.js';
import { playGame } from './game.js';
function changeTileType(pos) {
    console.log(pos);
}
// TODO: Create better state management
const enemies = [];
const playerGameObjects = [];
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
function makeEnemies(level) {
    enemies.push(new Zombie(level));
    enemies.push(new Creeper(level));
    enemies.push(new Zombie(level));
    enemies.push(new Creeper(level));
    enemies.push(new Zombie(level));
}
function makePlayerGameObjects(level) {
    playerGameObjects.push(new Turret({ x: 5, y: 6 }, level));
    playerGameObjects.push(new Turret({ x: 18, y: 11 }, level));
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const level = yield loadLevel();
        const canvas = getCanvas();
        adjustCanvasSize(canvas);
        const context = getContext(canvas);
        makeEnemies(level);
        makePlayerGameObjects(level);
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
