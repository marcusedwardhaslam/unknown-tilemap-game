import { Tile, TileType } from '../tiles/tile.js';
import { json } from './allmud.js';

export type LevelData = { type: TileType; image: string | null }[][];
export type Level = Tile[][];

export let level: Tile[][] = [];

export function loadLevel(): Promise<Level> {
  return new Promise((res, rej) => {
    try {
      const parsedLevel: Level = [];
      const loadedData: LevelData = JSON.parse(json);
      for (let y = 0; y < JSON.parse(json).length; y++) {
        parsedLevel.push([]);
        for (let x = 0; x < loadedData[y].length; x++) {
          parsedLevel[y].push(new Tile(loadedData[y][x].type));
        }
      }
      level = parsedLevel;
      res(level);
    } catch (ex) {
      rej(ex);
    }
  });
}
