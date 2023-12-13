import { TILE_SIZE } from './map.js';
function eventIsMouseEvent(e) {
    return (e.offsetX !== undefined &&
        e.offsetY !== undefined);
}
const convertClickToTilePosition = (e) => ({
    x: Math.floor(e.offsetY / TILE_SIZE),
    y: Math.floor(e.offsetX / TILE_SIZE),
});
export function registerEventListeners(canvas, handlers) {
    Object.keys(handlers).forEach((key) => {
        canvas.addEventListener(key, function (e) {
            if (eventIsMouseEvent(e)) {
                const tilePos = convertClickToTilePosition(e);
                handlers[key](tilePos);
            }
        });
    });
}
