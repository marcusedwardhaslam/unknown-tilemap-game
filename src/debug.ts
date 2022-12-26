import { TILE_SIZE } from "./map";
import { Position } from "./pathfinding";

export function renderRoute(ctx: CanvasRenderingContext2D, route: Position[]) {
  for (const node of route) {
    const { x, y } = node;
    ctx.fillStyle = '#94faff';
    ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}
