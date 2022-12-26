import { TILE_SIZE } from "./map.js";

interface Handlers {
  [key: string]: (tilePos: { x: number, y: number }) => any,
}

function eventIsMouseEvent(e: Event | MouseEvent): e is MouseEvent {
  return (e as MouseEvent).offsetX !== undefined && (e as MouseEvent).offsetY !== undefined;
}

const convertClickToTilePosition = (e: MouseEvent) => ({
  x: Math.floor(e.offsetY / TILE_SIZE),
  y: Math.floor(e.offsetX / TILE_SIZE),
});

// TODO: Fix types
export function registerEventListeners(canvas: HTMLCanvasElement, handlers: Handlers) {
  Object.keys(handlers).forEach(key => {
    canvas.addEventListener(key, function (e: Event) {
      if (eventIsMouseEvent(e)) {
        const tilePos = convertClickToTilePosition(e);
        handlers[key](tilePos);
      }
    });
  });
}
