var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { clearScreen, renderMapGraphics } from './graphics.js';
import { adjustCanvasSize, getCanvas, getContext } from './canvas.js';
import { registerEventListeners } from './controls.js';
import { renderTileMapGrid } from './map.js';
import { Tile, TileType } from './tiles/tile.js';
import { level, loadLevel } from './levels/manager.js';
const tileTypes = [
    { type: TileType.GOAL, name: 'GOAL' },
    { type: TileType.GRASS, name: 'GRASS' },
    { type: TileType.START, name: 'START' },
    { type: TileType.WATER, name: 'WATER' },
    { type: TileType.TOP_LEFT_CORNER_PATH, name: 'TOP_LEFT_CORNER_PATH' },
    { type: TileType.TOP_RIGHT_CORNER_PATH, name: 'TOP_RIGHT_CORNER_PATH' },
    { type: TileType.BOTTOM_LEFT_CORNER_PATH, name: 'BOTTOM_LEFT_CORNER_PATH' },
    { type: TileType.BOTTOM_RIGHT_CORNER_PATH, name: 'BOTTOM_RIGHT_CORNER_PATH' },
    { type: TileType.VERTICAL_PATH, name: 'VERTICAL_PATH' },
    { type: TileType.HORIZONTAL_PATH, name: 'HORIZONTAL_PATH' },
    { type: TileType.PATH, name: 'PATH' },
    { type: TileType.BOTTOM_EDGE_PATH, name: 'BOTTOM_EDGE_PATH' },
    { type: TileType.RIGHT_EDGE_PATH, name: 'RIGHT_EDGE_PATH' },
    { type: TileType.TOP_EDGE_PATH, name: 'TOP_EDGE_PATH' },
    { type: TileType.LEFT_EDGE_PATH, name: 'LEFT_EDGE_PATH' },
];
let activeTile = null;
function changeTileType(pos) {
    if (activeTile !== null) {
        level[pos.x][pos.y] = new Tile(activeTile);
    }
}
function setActiveTile(tileType) {
    activeTile = tileType;
}
function draw(canvas, ctx) {
    setTimeout(() => {
        requestAnimationFrame(() => {
            draw(canvas, ctx);
        });
        // Clear everything
        clearScreen(canvas, ctx);
        // Render tiles
        renderMapGraphics(level, ctx);
        // Render tile map grid(we want this on top of the tiles)
        renderTileMapGrid(ctx);
    }, 1000 / 60);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const level = yield loadLevel();
        const canvas = getCanvas();
        adjustCanvasSize(canvas);
        const context = getContext(canvas);
        const exportButton = document.getElementById('exportMap');
        if (exportButton !== null) {
            exportButton.onclick = () => console.log(btoa(JSON.stringify(level)));
        }
        const tileListHtmlElement = document.getElementById('tileList');
        for (const tileType of tileTypes) {
            const listItem = document.createElement('li');
            const button = document.createElement('button');
            const description = document.createTextNode(tileType.name);
            button.append(description);
            button.onclick = () => setActiveTile(tileType.type);
            listItem.append(button);
            tileListHtmlElement === null || tileListHtmlElement === void 0 ? void 0 : tileListHtmlElement.append(listItem);
        }
        registerEventListeners(canvas, {
            click: changeTileType,
        });
        draw(canvas, context);
    });
}
(() => {
    main().catch(console.log).catch(console.error);
})();
