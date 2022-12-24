const convertClickToTilePosition = (e) => ({
    row: Math.floor(e.layerY / 32),
    column: Math.floor(e.layerX / 32),
});
export function registerEventListeners(canvas, handlers) {
    Object.keys(handlers).forEach(key => {
        canvas.addEventListener(key, function (e) {
            const tilePos = convertClickToTilePosition(e);
            handlers[key](tilePos);
        });
    });
}
