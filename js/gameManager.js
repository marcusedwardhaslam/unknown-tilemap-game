import { Creeper } from './entities/creeper.js';
import { Turret } from './entities/turret.js';
import { Zombie } from './entities/zombie.js';
export const gameManager = {
    enemyGameObjects: [],
    playerGameObjects: [],
};
export function initGameManager(level) {
    gameManager.enemyGameObjects = [
        new Zombie(level),
        new Creeper(level),
        new Zombie(level),
        new Creeper(level),
        new Zombie(level),
    ];
    gameManager.playerGameObjects = [
        new Turret({ x: 5, y: 6 }, level),
        new Turret({ x: 18, y: 11 }, level),
    ];
    return gameManager;
}
