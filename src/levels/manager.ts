import { Position } from '../pathfinding.js';
import { Tile, TileType } from '../tiles/tile.js';
import { json } from './nicemap.js';

export type LevelData = { type: TileType; image: string | null }[][];
export type Level = Tile[][];

export let level: Tile[][] = [];

export function findTile(level: Level, tileType: TileType): Position {
  for (let y = 0; y < level.length; y++) {
    for (let x = 0; x < level[y].length; x++) {
      if (level[y][x].getType() === tileType) {
        return { x, y };
      }
    }
  }
  throw new Error('Tile type not found!');
}

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
