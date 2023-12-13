import { Enemy } from './entities/enemy.js';
import { Level } from './levels/manager.js';
import { Turret } from './entities/turret.js';
import { Zombie } from './entities/zombie.js';

export interface GameManager {
  enemyGameObjects: Enemy[];
  playerGameObjects: Turret[];
  level: Level | null;

  mobSpawner: () => void;

  score: number;
  money: number;
}

export const gameManager: GameManager = {
  enemyGameObjects: [],
  playerGameObjects: [],
  level: null,
  mobSpawner: () => console.log('Mob spawner not initialized'),
  score: 0,
  money: 200,
};

export function initGameManager(level: Level): GameManager {
  gameManager.level = level;
  gameManager.mobSpawner = () => {
    gameManager.enemyGameObjects.push(new Zombie(level));
    setTimeout(gameManager.mobSpawner, 5000);
  };
  // TODO: Is this wise? move init elsewhere
  gameManager.mobSpawner();
  return gameManager;
}

export function addEnemy(enemy: Enemy): void {
  gameManager.enemyGameObjects.push(enemy);
}

export function addTurret(turret: Turret): void {
  gameManager.playerGameObjects.push(turret);
}
