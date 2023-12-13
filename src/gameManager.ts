import { Creeper } from './entities/creeper.js';
import { Enemy } from './entities/enemy.js';
import { Level } from './levels/manager.js';
import { Turret } from './entities/turret.js';
import { Zombie } from './entities/zombie.js';

export interface GameManager {
  enemyGameObjects: Enemy[];
  playerGameObjects: Turret[];
}

export const gameManager: GameManager = {
  enemyGameObjects: [],
  playerGameObjects: [],
};

export function initGameManager(level: Level): GameManager {
  gameManager.enemyGameObjects = [
    new Creeper(level),
    new Creeper(level),
    new Zombie(level),
    new Zombie(level),
    new Zombie(level),
  ];
  gameManager.playerGameObjects = [
    new Turret({ x: 5, y: 6 }, level),
    new Turret({ x: 18, y: 11 }, level),
  ];
  return gameManager;
}
