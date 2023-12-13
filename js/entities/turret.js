import { TILE_SIZE } from '../map.js';
import config from '../config.js';
import { STATUS_BAR_HEIGHT } from '../graphics.js';
export class Turret {
    constructor(pos) {
        this.pos = pos;
        // Graphics
        this.image = new Image();
        // Attacking
        this.tileRange = 4;
        this.target = null;
        this.attackDamage = 1;
        this.attackTick = 0; // How many frames need to pass before enemy can attack again
        this.attackTickRate = config.fps * 1; // Attack once every half a second
        // Audio
        this.arrowFireSounds = [
            new Audio('assets/sounds/arrow1.wav'),
            new Audio('assets/sounds/arrow2.wav'),
            new Audio('assets/sounds/arrow3.wav'),
        ];
        this.onSpawnSounds = [
            new Audio('assets/sounds/ready-for-action-crushed.wav'),
        ];
        this.image.src = `${config.assets.path}/images/archer.png`;
        this.attackBoundary = {
            topLeft: {
                x: this.pos.x - this.tileRange,
                y: this.pos.y - this.tileRange,
            },
            topRight: {
                x: this.pos.x + this.tileRange,
                y: this.pos.y - this.tileRange,
            },
            bottomLeft: {
                x: this.pos.x - this.tileRange,
                y: this.pos.y + this.tileRange,
            },
            bottomRight: {
                x: this.pos.x + this.tileRange,
                y: this.pos.y + this.tileRange,
            },
        };
        this.onSpawn();
    }
    static getCost() {
        return this.cost;
    }
    onSpawn() {
        const onSpawnSound = this.onSpawnSounds[Math.floor(Math.random() * this.onSpawnSounds.length)];
        onSpawnSound.volume = 1;
        onSpawnSound.play();
    }
    draw(ctx) {
        if (config.debug) {
            ctx.beginPath();
            ctx.strokeStyle = 'black';
            ctx.strokeRect(Math.floor(this.pos.x * TILE_SIZE - this.tileRange * TILE_SIZE), Math.floor(this.pos.y * TILE_SIZE - this.tileRange * TILE_SIZE), this.tileRange * TILE_SIZE * 2 + TILE_SIZE, this.tileRange * TILE_SIZE * 2 + TILE_SIZE);
            ctx.stroke();
            ctx.closePath();
        }
        ctx.drawImage(this.image, this.pos.x * TILE_SIZE, STATUS_BAR_HEIGHT + this.pos.y * TILE_SIZE);
    }
    detectEnemiesInBoundary(enemies) {
        const enemiesInBoundary = [];
        for (const enemy of enemies) {
            if (this.enemyIsInBoundary(enemy)) {
                enemiesInBoundary.push(enemy);
            }
        }
        return enemiesInBoundary;
    }
    enemyIsInBoundary(enemy) {
        const enemyPos = enemy.getPos();
        const enemyInTopLeftBoundary = enemyPos.x >= this.attackBoundary.topLeft.x &&
            enemyPos.y >= this.attackBoundary.topLeft.y;
        const enemyInTopRightBoundary = enemyPos.x <= this.attackBoundary.topRight.x &&
            enemyPos.y >= this.attackBoundary.topRight.y;
        const enemyInBottomLeftBoundary = enemyPos.x >= this.attackBoundary.bottomLeft.x &&
            enemyPos.y <= this.attackBoundary.bottomLeft.y;
        const enemyInBottomRightBoundary = enemyPos.x <= this.attackBoundary.bottomRight.x &&
            enemyPos.y <= this.attackBoundary.bottomRight.y;
        return (enemyInTopLeftBoundary &&
            enemyInTopRightBoundary &&
            enemyInBottomLeftBoundary &&
            enemyInBottomRightBoundary);
    }
    attack(target) {
        target.takeDamage(this.attackDamage);
        const arrowFireSound = this.arrowFireSounds[Math.floor(Math.random() * this.arrowFireSounds.length)];
        arrowFireSound.volume = 1;
        // arrowFireSound.play();
        this.attackTick = this.attackTickRate;
        if (target.isDead()) {
            this.target = null;
        }
    }
    update(enemies) {
        if (this.attackTick > 0) {
            this.attackTick -= 1;
        }
        if (this.target !== null) {
            // Check enemy is still in boundary
            if (this.target.isDead() || this.enemyIsInBoundary(this.target)) {
                if (this.attackTick <= 0) {
                    this.attack(this.target);
                }
            }
            else {
                this.target = null;
            }
        }
        else {
            const enemiesInBoundary = this.detectEnemiesInBoundary(enemies);
            if (enemiesInBoundary.length > 0) {
                this.target =
                    enemiesInBoundary[Math.floor(Math.random() * enemiesInBoundary.length)];
            }
        }
    }
}
// Shop values
Turret.cost = 75;
