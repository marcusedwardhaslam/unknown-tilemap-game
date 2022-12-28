import { TILE_SIZE } from './map.js';
export function renderRoute(ctx, route, debugColour) {
    for (const node of route) {
        const { x, y } = node;
        ctx.fillStyle = debugColour !== null && debugColour !== void 0 ? debugColour : '#94faff';
        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
}
