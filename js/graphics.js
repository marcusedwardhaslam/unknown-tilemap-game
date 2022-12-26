import { TILE_SIZE } from './map.js';
export function renderMapGraphics(mapState, ctx) {
    let x = 0, y = 0;
    for (const column of mapState) {
        for (const row of column) {
            ctx.fillStyle = row.getGraphic();
            ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
            x += TILE_SIZE;
        }
        x = 0;
        y += TILE_SIZE;
    }
}
export function renderEnemies(ctx, enemies) {
    for (const enemy of enemies) {
        enemy.draw(ctx);
    }
}
export function clearScreen(canvas, ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
}
