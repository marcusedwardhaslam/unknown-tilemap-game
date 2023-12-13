import { MAP_HEIGHT, MAP_WIDTH, TILE_SIZE } from './map.js';
import { Position } from './pathfinding.js';

export function renderRoute(
  ctx: CanvasRenderingContext2D,
  route: Position[],
  debugColour?: string
) {
  for (const node of route) {
    const { x, y } = node;
    ctx.fillStyle = debugColour ?? '#94faff';
    ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}

export function renderTileMapGrid(ctx: CanvasRenderingContext2D): void {
  ctx.setLineDash([1, 2]);
  ctx.fillStyle = 'black';

  for (let column = 0; column < MAP_HEIGHT; column += TILE_SIZE) {
    for (let row = 0; row < MAP_WIDTH; row += TILE_SIZE) {
      ctx.strokeRect(row, column, TILE_SIZE, TILE_SIZE);
    }
  }
}
