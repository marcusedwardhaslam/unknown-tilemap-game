import { Enemy } from './enemy.js';

export class Creeper extends Enemy {
  private name = 'creeper';
  private hp = 2;
  protected fillStyle = 'blue';

  // How many frames need to pass before
  protected tickRate = 3;
}
