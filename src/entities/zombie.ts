import config from '../config.js';
import { Level } from '../levels/manager.js';
import { Position } from '../pathfinding.js';
import { Enemy } from './enemy.js';

export class Zombie extends Enemy {
  private name = 'zombie';
  protected hp = 2;
  protected fillStyle = 'green';

  // How many frames need to pass before zombie moves
  protected tickRate = 8;

  protected image = new Image();

  constructor(pos: Position, level: Level) {
    super(pos, level);
    this.image.src = `${config.assets.path}/images/zombie.png`;
  }
}
