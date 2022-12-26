const MAP_ROWS = 20;
const MAP_COLUMNS = 32;
export const TILE_SIZE = 32;
export const MAP_HEIGHT = MAP_ROWS * TILE_SIZE;
export const MAP_WIDTH = MAP_COLUMNS * TILE_SIZE;
export function renderTileMapGrid(ctx) {
    ctx.setLineDash([1, 2]);
    ctx.fillStyle = 'black';
    for (let column = 0; column < MAP_HEIGHT; column += TILE_SIZE) {
        for (let row = 0; row < MAP_WIDTH; row += TILE_SIZE) {
            ctx.strokeRect(row, column, TILE_SIZE, TILE_SIZE);
        }
    }
}
