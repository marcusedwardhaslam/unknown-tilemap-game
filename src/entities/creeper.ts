import config from '../config.js';
import { Level } from '../levels/manager.js';
import { Enemy } from './enemy.js';

export class Creeper extends Enemy {
  private name = 'creeper';
  protected maxHp = 2;
  protected fillStyle = 'blue';

  // How many frames need to pass before creeper moves
  protected tickRate = 4;

  // What do I get for killing this unit?
  protected killValue = 50;
  public getKillValue() {
    return this.killValue;
  }

  constructor(level: Level) {
    super(level);
    this.hp = this.maxHp;
    this.image.src = `${config.assets.path}/images/creeper.png`;
  }
}
