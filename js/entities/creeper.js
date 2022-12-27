import { Enemy } from './enemy.js';
export class Creeper extends Enemy {
    constructor() {
        super(...arguments);
        this.name = 'creeper';
        this.hp = 2;
        this.fillStyle = 'blue';
        // How many frames need to pass before
        this.tickRate = 3;
    }
}
