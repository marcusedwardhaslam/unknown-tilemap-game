import config from '../config.js';
import { renderRoute } from '../debug.js';
import { findTile } from '../levels/manager.js';
import { TILE_SIZE } from '../map.js';
import { aStar } from '../pathfinding.js';
import { TileType } from '../tiles/tile.js';
export class Enemy {
    constructor(level) {
        this.level = level;
        // This enemies current tick
        this.tick = 0;
        // How many frames need to pass before
        this.tickRate = 2;
        this.route = [];
        // graphics
        this.width = 16;
        this.fillStyle = 'grey';
        this.image = new Image();
        this.hitSound = [
            new Audio('assets/sounds/zombiehit1.wav'),
            new Audio('assets/sounds/zombiehit2.wav'),
            new Audio('assets/sounds/zombiehit3.wav'),
        ];
        this.deathSound = new Audio('assets/sounds/zombiedeath.wav');
        // Status
        this.hp = 0;
        this.dead = false;
        this.pos = findTile(level, TileType.START);
        this.goal = findTile(level, TileType.GOAL);
        this.updateRoute();
    }
    isDead() {
        return this.dead;
    }
    setRoute(route) {
        this.route = route;
    }
    getRoute() {
        return this.route;
    }
    getPos() {
        return this.pos;
    }
    hit() {
        const hitSound = this.hitSound[Math.floor(Math.random() * this.hitSound.length)];
        hitSound.volume = 0.01;
        // hitSound.play();
    }
    die() {
        // this.deathSound.play();
        this.dead = true;
    }
    draw(ctx) {
        if (this.image.src === '') {
            ctx.beginPath();
            ctx.fillStyle = this.fillStyle;
            ctx.arc(this.pos.x * TILE_SIZE + TILE_SIZE / 2, this.pos.y * TILE_SIZE + TILE_SIZE / 2, this.width / 2, 0, 360);
            ctx.fill();
            ctx.closePath();
            return;
        }
        if (config.debug) {
            renderRoute(ctx, this.route, 'rgba(255, 255, 255, 0.1)');
        }
        ctx.drawImage(this.image, this.pos.x * TILE_SIZE, this.pos.y * TILE_SIZE);
    }
    updatePosition() {
        const nextPosition = this.route.splice(0, 1)[0];
        if (nextPosition) {
            this.pos.x = nextPosition.x;
            this.pos.y = nextPosition.y;
            this.tick = 0;
        }
    }
    updateRoute() {
        const route = aStar(this.level, this.pos, this.goal);
        this.route = route;
    }
    takeDamage(damage) {
        if (damage <= 0) {
            return;
        }
        this.hit();
        this.hp -= damage;
        if (this.hp < 0) {
            this.die();
        }
    }
    update() {
        this.tick += 1;
        if (this.tick > this.tickRate) {
            this.updatePosition();
        }
    }
}
