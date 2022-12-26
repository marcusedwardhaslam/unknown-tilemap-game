import { TILE_SIZE } from "./map.js";
import { Tile } from "./tile.js";

export function renderMapGraphics(mapState: Tile[][], ctx: CanvasRenderingContext2D) {
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
