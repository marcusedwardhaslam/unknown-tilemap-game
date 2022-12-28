import { Level } from '../levels/manager.js';
import { Position } from '../pathfinding.js';
import { Enemy } from './enemy.js';

export class Creeper extends Enemy {
  private name = 'creeper';
  private hp = 2;
  protected fillStyle = 'blue';

  // How many frames need to pass before
  protected tickRate = 3;

  constructor(pos: Position, level: Level) {
    super(pos, level);
    this.image.src = 'assets/creeper.png';
  }
}
