import { getCanvas, getContext } from './canvas.js';
import { registerEventListeners } from './controls.js';
import { renderMapGraphics } from './graphics.js';
import { renderTileMap } from './map.js';
import { level } from './levels/1.js';
function changeTileType({ row, column }) {
    const tile = level[row][column];
    const currentColour = tile.getColour();
    if (currentColour === '#9ECB91') {
        tile.setColour('#9B7653');
    }
    else {
        tile.setColour('#9ECB91');
    }
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
        // Render map (we want this on top of the tiles)
        renderTileMap(ctx);
        // Gameplay loop
    }, 1000 / 60);
}
function clearScreen(canvas, ctx) {
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
