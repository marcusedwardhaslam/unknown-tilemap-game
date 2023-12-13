import config from '../config.js';
import { Level } from '../levels/manager.js';
import { Enemy } from './enemy.js';

export class Zombie extends Enemy {
  private name = 'zombie';
  protected maxHp = 4;
  protected fillStyle = 'green';

  // How many frames need to pass before zombie moves
  protected tickRate = 8;

  protected image = new Image();

  constructor(level: Level) {
    super(level);
    this.hp = this.maxHp;
    this.image.src = `${config.assets.path}/images/zombie.png`;
  }
}
