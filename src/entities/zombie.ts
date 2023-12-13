import config from '../config.js';
import { Level } from '../levels/manager.js';
import { Enemy } from './enemy.js';

export class Zombie extends Enemy {
  private name = 'zombie';
  protected maxHp = 4;
  protected fillStyle = 'green';

  // How many frames need to pass before zombie moves
  protected tickRate = 14;

  protected image = new Image();

  // What do I get for killing this unit?
  protected killValue = 25;
  public getKillValue() {
    return this.killValue;
  }

  constructor(level: Level) {
    super(level);
    this.hp = this.maxHp;
    this.image.src = `${config.assets.path}/images/zombie.png`;
  }
}
