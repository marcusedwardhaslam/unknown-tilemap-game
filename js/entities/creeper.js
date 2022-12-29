import config from '../config.js';
import { Enemy } from './enemy.js';
export class Creeper extends Enemy {
    constructor(pos, level) {
        super(pos, level);
        this.name = 'creeper';
        this.hp = 1;
        this.fillStyle = 'blue';
        // How many frames need to pass before creeper moves
        this.tickRate = 4;
        this.image.src = `${config.assets.path}/images/creeper.png`;
    }
}
