import config from '../config.js';
import { renderRoute } from '../debug.js';
import { Level } from '../levels/manager.js';
import { TILE_SIZE } from '../map.js';
import { aStar, Position } from '../pathfinding.js';

export class Enemy {
  // This enemies current tick
  protected tick = 0;
  // How many frames need to pass before
  protected tickRate = 2;

  protected route: Position[] = [];

  // graphics
  protected width = 16;
  protected fillStyle = 'grey';
  protected image = new Image();
  protected hitSound: HTMLAudioElement = new Audio(
    'assets/sounds/zombiehit.wav'
  );
  protected deathSound: HTMLAudioElement = new Audio(
    'assets/sounds/zombiedeath.wav'
  );

  protected hp = 0;
  protected dead = false;

  constructor(protected pos: Position, protected level: Level) {
    this.updateRoute();
  }

  public isDead(): boolean {
    return this.dead;
  }

  public setRoute(route: Position[]) {
    this.route = route;
  }

  public getRoute() {
    return this.route;
  }

  public getPos(): Position {
    return this.pos;
  }

  public hit(): void {
    this.hitSound.play();
  }

  public die(): void {
    this.deathSound.play();
    this.dead = true;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (this.image.src === '') {
      ctx.beginPath();
      ctx.fillStyle = this.fillStyle;
      ctx.arc(
        this.pos.x * TILE_SIZE + TILE_SIZE / 2,
        this.pos.y * TILE_SIZE + TILE_SIZE / 2,
        this.width / 2,
        0,
        360
      );
      ctx.fill();
      ctx.closePath();
      return;
    }

    if (config.debug) {
      renderRoute(ctx, this.route, 'rgba(255, 255, 255, 0.1)');
    }
    ctx.drawImage(this.image, this.pos.x * TILE_SIZE, this.pos.y * TILE_SIZE);
  }

  protected updatePosition() {
    const nextPosition = this.route.splice(0, 1)[0];
    if (nextPosition) {
      this.pos.x = nextPosition.x;
      this.pos.y = nextPosition.y;
      this.tick = 0;
    }
  }

  // TODO: Dynamically get destination from map
  protected updateRoute() {
    const route = aStar(
      this.level,
      {
        x: this.pos.x,
        y: this.pos.y,
      },
      {
        x: 31,
        y: 18,
      }
    );
    this.route = route;
  }

  public takeDamage(damage: number) {
    if (damage <= 0) {
      return;
    }
    this.hit();
    this.hp -= damage;
    if (this.hp < 0) {
      this.die();
    }
  }

  public update() {
    this.tick += 1;
    if (this.tick > this.tickRate) {
      this.updatePosition();
    }
  }
}
