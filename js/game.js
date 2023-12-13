export function playGame(enemies, playerGameObjects) {
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        if (enemy.isDead()) {
            enemies.splice(i, 1);
            continue;
        }
        enemy.update();
    }
    for (const playerGameObject of playerGameObjects) {
        playerGameObject.update(enemies);
    }
}
