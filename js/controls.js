import { Turret } from './entities/turret.js';
import { addTurret } from './gameManager.js';
import { level } from './levels/manager.js';
import { TILE_SIZE } from './map.js';
function eventIsMouseEvent(e) {
    return (e.offsetX !== undefined &&
        e.offsetY !== undefined);
}
const convertClickToTilePosition = (e) => ({
    x: Math.floor(e.offsetX / TILE_SIZE),
    y: Math.floor(e.offsetY / TILE_SIZE),
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
export function setupControls(canvas) {
    registerEventListeners(canvas, {
        click: (tilePos) => {
            const tile = level[tilePos.y][tilePos.x];
            if (tile.isPath() || tile.isOccupied()) {
                return;
            }
            tile.setOccupied(true);
            addTurret(new Turret(tilePos));
        },
    });
}
