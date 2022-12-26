import { level } from "../levels/1.js";
import { TILE_SIZE } from "../map.js";
import { aStar } from "../pathfinding.js";
export class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.name = 'zombie';
        this.hp = 2;
        // This enemies current tick
        this.tick = 0;
        // How many frames need to pass before 
        this.tickRate = 6;
        // Best path to goal
        this.route = [];
        // graphics
        this.width = 16;
    }
    setRoute(route) {
        this.route = route;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.arc((this.x * TILE_SIZE) + (TILE_SIZE / 2), (this.y * TILE_SIZE) + (TILE_SIZE / 2), this.width / 2, 0, 360);
        ctx.fill();
        ctx.closePath();
    }
    updatePosition() {
        const nextPosition = this.route.splice(0, 1)[0];
        if (nextPosition) {
            this.x = nextPosition.x;
            this.y = nextPosition.y;
            this.tick = 0;
        }
    }
    // TODO: Dynamically get destination from map
    updateRoute() {
        const route = aStar(level, {
            x: this.x,
            y: this.y,
        }, {
            x: 31,
            y: 18,
        });
        this.route = route;
    }
    update() {
        this.tick += 1;
        if (this.tick > this.tickRate) {
            this.updateRoute();
            this.updatePosition();
        }
    }
}
