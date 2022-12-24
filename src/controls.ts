const convertClickToTilePosition = (e: Event) => ({
  row: Math.floor(e.layerY / 32),
  column: Math.floor(e.layerX / 32),
});

export function registerEventListeners(canvas: HTMLCanvasElement, handlers: {
  [key: string]: (tilePos: { row: number, column: number }) => void,
}) {
  Object.keys(handlers).forEach(key => {
    canvas.addEventListener(key, function (e: Event) {
      const tilePos = convertClickToTilePosition(e);
      handlers[key](tilePos);
    });
  });
}
