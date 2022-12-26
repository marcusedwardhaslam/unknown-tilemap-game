import { level } from "../levels/1.js";
import { TILE_SIZE } from "../map.js";
import { aStar, Position } from "../pathfinding.js";

export class Enemy {
  private name = 'zombie';
  private hp = 2;

  // This enemies current tick
  private tick = 0;
  // How many frames need to pass before 
  private tickRate = 6;

  // Best path to goal
  private route: Position[] = [];

  // graphics
  private width = 16;
  
  constructor(private x: number, private y: number) {}

  public setRoute(route: Position[]) {
    this.route = route;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc((this.x * TILE_SIZE) + (TILE_SIZE / 2), (this.y * TILE_SIZE) + (TILE_SIZE / 2), this.width / 2, 0, 360);
    ctx.fill();
    ctx.closePath();
  }

  private updatePosition() {
    const nextPosition = this.route.splice(0, 1)[0];
    if (nextPosition) {
      this.x = nextPosition.x;
      this.y = nextPosition.y;
      this.tick = 0;
    }
  }

  // TODO: Dynamically get destination from map
  private updateRoute() {
    const route = aStar(level, {
      x: this.x,
      y: this.y,
    }, {
      x: 31,
      y: 18,
    });
    this.route = route;
  }

  public update() {
    this.tick += 1;
    if (this.tick > this.tickRate) {
      this.updateRoute()
      this.updatePosition();
    }
  }
}
