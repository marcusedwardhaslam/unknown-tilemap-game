import { TILE_SIZE } from "./map.js";
function eventIsMouseEvent(e) {
    return e.offsetX !== undefined && e.offsetY !== undefined;
}
const convertClickToTilePosition = (e) => ({
    row: Math.floor(e.offsetY / TILE_SIZE),
    column: Math.floor(e.offsetX / TILE_SIZE),
});
export function registerEventListeners(canvas, handlers, mapState) {
    Object.keys(handlers).forEach(key => {
        canvas.addEventListener(key, function (e) {
            if (eventIsMouseEvent(e)) {
                const tilePos = convertClickToTilePosition(e);
                handlers[key](tilePos);
            }
        });
    });
    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
            console.log({ mapState });
        }
    });
}
