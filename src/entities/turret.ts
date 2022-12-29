import { Position } from '../pathfinding.js';
import { TILE_SIZE } from '../map.js';
import { Level } from '../levels/manager.js';
import { Enemy } from './enemy.js';
import config from '../config.js';

type Boundary = {
  topLeft: Position;
  topRight: Position;
  bottomLeft: Position;
  bottomRight: Position;
};

export class Turret {
  private boundary: Boundary;
  protected tileRange = 4;
  protected image = new Image();
  protected target: Enemy | null = null;
  protected attackDamage = 1;

  protected attackTick = 0;

  // Attack once every half a second
  protected attackTickRate = config.fps * 0.5;

  protected arrowFireSound: HTMLAudioElement = new Audio(
    'assets/sounds/arrowfire.wav'
  );

  constructor(protected pos: Position, protected level: Level) {
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

  public draw(ctx: CanvasRenderingContext2D) {
    if (config.debug) {
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.strokeRect(
        Math.floor(this.pos.x * TILE_SIZE - this.tileRange * TILE_SIZE),
        Math.floor(this.pos.y * TILE_SIZE - this.tileRange * TILE_SIZE),
        this.tileRange * TILE_SIZE * 2 + TILE_SIZE,
        this.tileRange * TILE_SIZE * 2 + TILE_SIZE
      );
      ctx.stroke();
      ctx.closePath();
    }
    ctx.drawImage(this.image, this.pos.x * TILE_SIZE, this.pos.y * TILE_SIZE);
  }

  private detectEnemiesInBoundary(enemies: Enemy[]): Enemy[] {
    const enemiesInBoundary = [];
    for (const enemy of enemies) {
      if (this.enemyIsInBoundary(enemy)) {
        enemiesInBoundary.push(enemy);
      }
    }
    return enemiesInBoundary;
  }

  private enemyIsInBoundary(enemy: Enemy) {
    const enemyPos = enemy.getPos();
    const enemyInTopLeftBoundary =
      enemyPos.x >= this.boundary.topLeft.x &&
      enemyPos.y >= this.boundary.topLeft.y;
    const enemyInTopRightBoundary =
      enemyPos.x <= this.boundary.topRight.x &&
      enemyPos.y >= this.boundary.topRight.y;
    const enemyInBottomLeftBoundary =
      enemyPos.x >= this.boundary.bottomLeft.x &&
      enemyPos.y <= this.boundary.bottomLeft.y;
    const enemyInBottomRightBoundary =
      enemyPos.x <= this.boundary.bottomRight.x &&
      enemyPos.y <= this.boundary.bottomRight.y;
    return (
      enemyInTopLeftBoundary &&
      enemyInTopRightBoundary &&
      enemyInBottomLeftBoundary &&
      enemyInBottomRightBoundary
    );
  }

  private attack(target: Enemy) {
    target.takeDamage(this.attackDamage);
    this.arrowFireSound.play();
    this.attackTick = this.attackTickRate;
    if (target.isDead()) {
      this.target = null;
    }
  }

  public update(enemies: Enemy[]) {
    if (this.attackTick > 0) {
      this.attackTick -= 1;
    }

    if (this.target !== null) {
      // Check enemy is still in boundary
      if (this.target.isDead() || this.enemyIsInBoundary(this.target)) {
        if (this.attackTick <= 0) {
          this.attack(this.target);
        }
      } else {
        this.target = null;
      }
    } else {
      const enemiesInBoundary = this.detectEnemiesInBoundary(enemies);
      if (enemiesInBoundary.length > 0) {
        this.target =
          enemiesInBoundary[
            Math.floor(Math.random() * enemiesInBoundary.length)
          ];
      }
    }
  }
}
