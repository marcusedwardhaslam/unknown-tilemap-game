import { Enemy } from './enemy.js';
export class Creeper extends Enemy {
    constructor(pos, level) {
        super(pos, level);
        this.name = 'creeper';
        this.hp = 2;
        this.fillStyle = 'blue';
        // How many frames need to pass before
        this.tickRate = 3;
        this.image.src = 'assets/creeper.png';
    }
}
