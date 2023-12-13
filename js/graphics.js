import { gameManager } from './gameManager.js';
import { TILE_SIZE } from './map.js';
export const STATUS_BAR_HEIGHT = 50;
export function renderMapGraphics(mapState, ctx) {
    let x = 0, y = STATUS_BAR_HEIGHT;
    for (const column of mapState) {
        for (const row of column) {
            ctx.drawImage(row.getImage(), x, y);
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
export function renderPlayerTurrets(ctx, turrets) {
    for (const turret of turrets) {
        turret.draw(ctx);
    }
}
export function clearScreen(canvas, ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
}
export function renderUserInterface(canvas, ctx) {
    ctx.fillStyle = 'black';
    ctx.font = '20px Courier New';
    ctx.fillText(`Score: ${gameManager.score}`, 5, 30);
    ctx.fillText(`Money: ${gameManager.money}`, canvas.width - 125, 30);
}
