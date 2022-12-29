import { Tile } from '../tiles/tile.js';
import { json } from './nicemap.js';
export let level = [];
export function loadLevel() {
    return new Promise((res, rej) => {
        try {
            const parsedLevel = [];
            const loadedData = JSON.parse(json);
            for (let y = 0; y < JSON.parse(json).length; y++) {
                parsedLevel.push([]);
                for (let x = 0; x < loadedData[y].length; x++) {
                    parsedLevel[y].push(new Tile(loadedData[y][x].type));
                }
            }
            level = parsedLevel;
            res(level);
        }
        catch (ex) {
            rej(ex);
        }
    });
}
