import { TILE_SIZE } from '../map.js';
import config from '../config.js';
export class Turret {
    constructor(pos, level) {
        this.pos = pos;
        this.level = level;
        this.tileRange = 4;
        this.image = new Image();
        this.target = null;
        this.attackDamage = 1;
        this.attackTick = 0;
        // Attack once every half a second
        this.attackTickRate = config.fps * 0.5;
        this.arrowFireSound = new Audio('assets/sounds/arrowfire.wav');
        this.image.src = `${config.assets.path}/images/castle.png`;
        this.boundary = {
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
    }
    draw(ctx) {
        if (config.debug) {
            ctx.beginPath();
            ctx.strokeStyle = 'black';
            ctx.strokeRect(Math.floor(this.pos.x * TILE_SIZE - this.tileRange * TILE_SIZE), Math.floor(this.pos.y * TILE_SIZE - this.tileRange * TILE_SIZE), this.tileRange * TILE_SIZE * 2 + TILE_SIZE, this.tileRange * TILE_SIZE * 2 + TILE_SIZE);
            ctx.stroke();
            ctx.closePath();
        }
        ctx.drawImage(this.image, this.pos.x * TILE_SIZE, this.pos.y * TILE_SIZE);
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
        const enemyInTopLeftBoundary = enemyPos.x >= this.boundary.topLeft.x &&
            enemyPos.y >= this.boundary.topLeft.y;
        const enemyInTopRightBoundary = enemyPos.x <= this.boundary.topRight.x &&
            enemyPos.y >= this.boundary.topRight.y;
        const enemyInBottomLeftBoundary = enemyPos.x >= this.boundary.bottomLeft.x &&
            enemyPos.y <= this.boundary.bottomLeft.y;
        const enemyInBottomRightBoundary = enemyPos.x <= this.boundary.bottomRight.x &&
            enemyPos.y <= this.boundary.bottomRight.y;
        return (enemyInTopLeftBoundary &&
            enemyInTopRightBoundary &&
            enemyInBottomLeftBoundary &&
            enemyInBottomRightBoundary);
    }
    attack(target) {
        target.takeDamage(this.attackDamage);
        this.arrowFireSound.play();
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
