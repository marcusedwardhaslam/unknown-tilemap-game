import { Zombie } from './entities/zombie.js';
export const gameManager = {
    enemyGameObjects: [],
    playerGameObjects: [],
    level: null,
    mobSpawner: () => console.log('Mob spawner not initialized'),
    score: 0,
    money: 200,
};
export function initGameManager(level) {
    gameManager.level = level;
    gameManager.mobSpawner = () => {
        gameManager.enemyGameObjects.push(new Zombie(level));
        setTimeout(gameManager.mobSpawner, 5000);
    };
    // TODO: Is this wise? move init elsewhere
    gameManager.mobSpawner();
    return gameManager;
}
export function addEnemy(enemy) {
    gameManager.enemyGameObjects.push(enemy);
}
export function addTurret(turret) {
    gameManager.playerGameObjects.push(turret);
}
