import { Enemy } from './enemy.js';
export class Zombie extends Enemy {
    constructor(pos) {
        super(pos);
        this.name = 'zombie';
        this.hp = 2;
        this.fillStyle = 'green';
        // How many frames need to pass before
        this.tickRate = 6;
        this.image = new Image();
        this.image.src = 'assets/zombie.png';
    }
}
