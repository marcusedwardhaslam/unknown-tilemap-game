import config from '../config.js';
import { Enemy } from './enemy.js';
export class Zombie extends Enemy {
    constructor(pos, level) {
        super(pos, level);
        this.name = 'zombie';
        this.hp = 2;
        this.fillStyle = 'green';
        // How many frames need to pass before zombie moves
        this.tickRate = 8;
        this.image = new Image();
        this.image.src = `${config.assets.path}/images/zombie.png`;
    }
}
