import { TILE_SIZE } from "./map.js";

function eventIsMouseEvent(e: Event | MouseEvent): e is MouseEvent {
  return (e as MouseEvent).offsetX !== undefined && (e as MouseEvent).offsetY !== undefined;
}

const convertClickToTilePosition = (e: MouseEvent) => ({
  row: Math.floor(e.offsetY / TILE_SIZE),
  column: Math.floor(e.offsetX / TILE_SIZE),
});

export function registerEventListeners(canvas: HTMLCanvasElement, handlers: {
  [key: string]: (tilePos: { row: number, column: number }) => void,
}, mapState: any) {
  Object.keys(handlers).forEach(key => {
    canvas.addEventListener(key, function (e: Event) {
      if (eventIsMouseEvent(e)) {
        const tilePos = convertClickToTilePosition(e);
        handlers[key](tilePos);
      }
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      console.log({mapState})
    }
  })
}
