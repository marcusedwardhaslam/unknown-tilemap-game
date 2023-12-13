import config from '../config.js';
import { Enemy } from './enemy.js';
export class Zombie extends Enemy {
    constructor(level) {
        super(level);
        this.name = 'zombie';
        this.maxHp = 4;
        this.fillStyle = 'green';
        // How many frames need to pass before zombie moves
        this.tickRate = 8;
        this.image = new Image();
        this.hp = this.maxHp;
        this.image.src = `${config.assets.path}/images/zombie.png`;
    }
}
