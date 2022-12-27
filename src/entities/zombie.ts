import { Enemy } from './enemy.js';

export class Zombie extends Enemy {
  private name = 'zombie';
  private hp = 2;
  protected fillStyle = 'green';

  // How many frames need to pass before
  protected tickRate = 6;
}
