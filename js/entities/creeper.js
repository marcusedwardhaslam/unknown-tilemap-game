import config from '../config.js';
import { Enemy } from './enemy.js';
export class Creeper extends Enemy {
    constructor(level) {
        super(level);
        this.name = 'creeper';
        this.maxHp = 2;
        this.fillStyle = 'blue';
        // How many frames need to pass before creeper moves
        this.tickRate = 4;
        this.hp = this.maxHp;
        this.image.src = `${config.assets.path}/images/creeper.png`;
    }
}
