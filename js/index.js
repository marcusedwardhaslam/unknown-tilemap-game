var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { clearScreen, renderEnemies, renderMapGraphics } from './graphics.js';
import { getCanvas, getContext } from './canvas.js';
import { registerEventListeners } from './controls.js';
import { Zombie } from './entities/zombie.js';
import { Creeper } from './entities/creeper.js';
import { level, loadLevel } from './levels/manager.js';
import { renderTileMapGrid } from './map.js';
function changeTileType(pos) {
    console.log(pos);
}
const enemies = [];
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
        renderTileMapGrid(ctx);
        // Gameplay loop
        playGame(enemies);
    }, 1000 / 60);
}
// TODO: Refactor - Move to appropriate file.
function playGame(enemies) {
    for (const enemy of enemies) {
        enemy.update();
    }
}
function makeEnemies(level) {
    enemies.push(new Zombie({ x: 1, y: 0 }, level));
    enemies.push(new Creeper({ x: 1, y: 0 }, level));
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const level = yield loadLevel();
        const canvas = getCanvas();
        const context = getContext(canvas);
        makeEnemies(level);
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
