import { Turret } from './entities/turret.js';
import { addTurret, gameManager } from './gameManager.js';
import { STATUS_BAR_HEIGHT } from './graphics.js';
import { level } from './levels/manager.js';
import { TILE_SIZE } from './map.js';
import { Position } from './pathfinding.js';

interface Handlers {
  [key: string]: (tilePos: Position) => void;
}

function eventIsMouseEvent(e: Event | MouseEvent): e is MouseEvent {
  return (
    (e as MouseEvent).offsetX !== undefined &&
    (e as MouseEvent).offsetY !== undefined
  );
}

const convertClickToTilePosition = (e: MouseEvent) => ({
  x: Math.floor(e.offsetX / TILE_SIZE),
  y: Math.floor((e.offsetY - STATUS_BAR_HEIGHT) / TILE_SIZE),
});

export function registerEventListeners(
  canvas: HTMLCanvasElement,
  handlers: Handlers
) {
  Object.keys(handlers).forEach((key) => {
    canvas.addEventListener(key, function (e: Event) {
      if (eventIsMouseEvent(e)) {
        const tilePos = convertClickToTilePosition(e);
        handlers[key](tilePos);
      }
    });
  });
}

export function setupControls(canvas: HTMLCanvasElement) {
  // TODO: Change where this events handler exists?
  registerEventListeners(canvas, {
    click: (tilePos) => {
      const tile = level[tilePos.y][tilePos.x];
      if (tile.isPath() || tile.isOccupied()) {
        return;
      }
      if (Turret.getCost() > gameManager.money) {
        return;
      }
      tile.setOccupied(true);
      addTurret(new Turret(tilePos));
      gameManager.money -= Turret.getCost();
    },
  });
}
