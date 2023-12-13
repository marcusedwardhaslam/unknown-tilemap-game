import { Enemy } from './entities/enemy.js';
import { Turret } from './entities/turret.js';
import { gameManager } from './gameManager.js';
import { TILE_SIZE } from './map.js';
import { Tile } from './tiles/tile.js';

export const STATUS_BAR_HEIGHT = 50;

export function renderMapGraphics(
  mapState: Tile[][],
  ctx: CanvasRenderingContext2D
) {
  let x = 0,
    y = STATUS_BAR_HEIGHT;
  for (const column of mapState) {
    for (const row of column) {
      ctx.drawImage(row.getImage(), x, y);
      x += TILE_SIZE;
    }
    x = 0;
    y += TILE_SIZE;
  }
}

export function renderEnemies(ctx: CanvasRenderingContext2D, enemies: Enemy[]) {
  for (const enemy of enemies) {
    enemy.draw(ctx);
  }
}

export function renderPlayerTurrets(
  ctx: CanvasRenderingContext2D,
  turrets: Turret[]
) {
  for (const turret of turrets) {
    turret.draw(ctx);
  }
}

export function clearScreen(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
}

export function renderUserInterface(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.fillStyle = 'black';
  ctx.font = '20px Courier New';
  ctx.fillText(`Score: ${gameManager.score}`, 5, 30);
  ctx.fillText(`Money: ${gameManager.money}`, canvas.width - 125, 30);
}
