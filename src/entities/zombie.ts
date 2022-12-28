import { Position } from '../pathfinding.js';
import { Enemy } from './enemy.js';

export class Zombie extends Enemy {
  private name = 'zombie';
  private hp = 2;
  protected fillStyle = 'green';

  // How many frames need to pass before
  protected tickRate = 6;

  protected image = new Image();

  constructor(pos: Position) {
    super(pos);
    this.image.src = 'assets/zombie.png';
  }
}
