import config from '../config.js';
import { Level } from '../levels/manager.js';
import { Position } from '../pathfinding.js';
import { Enemy } from './enemy.js';

export class Creeper extends Enemy {
  private name = 'creeper';
  protected hp = 1;
  protected fillStyle = 'blue';

  // How many frames need to pass before creeper moves
  protected tickRate = 4;

  constructor(pos: Position, level: Level) {
    super(pos, level);
    this.image.src = `${config.assets.path}/images/creeper.png`;
  }
}
