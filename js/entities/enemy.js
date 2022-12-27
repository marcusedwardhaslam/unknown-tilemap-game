import { level } from "../levels/1.js";
import { TILE_SIZE } from "../map.js";
import { aStar } from "../pathfinding.js";
export class Enemy {
    constructor(pos) {
        this.pos = pos;
        // This enemies current tick
        this.tick = 0;
        // How many frames need to pass before
        this.tickRate = 2;
        this.route = [];
        // graphics
        this.width = 16;
        this.fillStyle = 'grey';
    }
    setRoute(route) {
        this.route = route;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.fillStyle;
        ctx.arc(this.pos.x * TILE_SIZE + TILE_SIZE / 2, this.pos.y * TILE_SIZE + TILE_SIZE / 2, this.width / 2, 0, 360);
        ctx.fill();
        ctx.closePath();
    }
    updatePosition() {
        const nextPosition = this.route.splice(0, 1)[0];
        if (nextPosition) {
            this.pos.x = nextPosition.x;
            this.pos.y = nextPosition.y;
            this.tick = 0;
        }
    }
    // TODO: Dynamically get destination from map
    updateRoute() {
        const route = aStar(level, {
            x: this.pos.x,
            y: this.pos.y,
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
