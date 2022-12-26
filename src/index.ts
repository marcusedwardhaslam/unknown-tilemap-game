import { getCanvas, getContext } from './canvas.js';
import { registerEventListeners } from './controls.js';
import { renderMapGraphics } from './graphics.js';
import { renderTileMap, TILE_SIZE } from './map.js';
import { level } from './levels/2.js';
import { TileType } from './tile.js';
import { aStar, Position } from './pathfinding.js';

function changeTileType({row, column}: {row: number, column: number}) {
  const tile = level[row][column];
  const currentType = tile.getType();

  switch(currentType) {
    case TileType.GRASS:
      tile.setType(TileType.SAND);
      break;
    case TileType.SAND:
      tile.setType(TileType.START);
      break;
    case TileType.START:
      tile.setType(TileType.GOAL);
      break;
    case TileType.GOAL:
      tile.setType(TileType.GRASS);
      break;
    default:
      break;
  }
}

// TODO: Refactor - Move to appropriate file.
class Enemy {
  private name = 'zombie';
  private hp = 2;
  // How many frames need to pass before 
  private tickRate = 6;

  private route: Position[] = [];

  private width = 16;

  private tick = 0;
  
  constructor(private x: number, private y: number) {}

  public setRoute(route: Position[]) {
    this.route = route;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc((this.x * TILE_SIZE) + (TILE_SIZE / 2), (this.y * TILE_SIZE) + (TILE_SIZE / 2), this.width / 2, 0, 360);
    ctx.fill();
    ctx.closePath();
  }

  private updatePosition() {
    const nextPosition = this.route.splice(0, 1)[0];
    this.x = nextPosition.x;
    this.y = nextPosition.y;
    this.tick = 0;
  }

  private updateRoute() {
    const route = aStar(level, {
      x: this.x,
      y: this.y,
    }, {
      x: 31,
      y: 18,
    });
    this.route = route;
  }

  public update() {
    this.tick += 1;
    if (this.tick > this.tickRate) {
      this.updateRoute()
      this.updatePosition();
    }
  }
}

const enemies: Enemy[] = [new Enemy(1, 0)];

function draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  setTimeout(() => {
    requestAnimationFrame(() => {
      draw(canvas, ctx);
    });

    // Clear everything
    clearScreen(canvas, ctx);

    // Render tiles
    renderMapGraphics(level, ctx);

    const route = aStar(level, {
      x: 1,
      y: 0,
    }, {
      x: 31,
      y: 18,
    });

    renderRoute(ctx, route.map(node => ({
      x: node.x,
      y: node.y,
    })));

    renderEnemies(ctx, enemies);

    // Render map (we want this on top of the tiles)
    renderTileMap(ctx);

    // Gameplay loop
    playGame(enemies);
  }, 1000 / 60);
}

// TODO: Refactor - Move to appropriate file.
function playGame(enemies: Enemy[]) {
  for (const enemy of enemies) {
    enemy.update();
  }
}

// TODO: Refactor - Move to appropriate file.
function renderEnemies(ctx: CanvasRenderingContext2D, enemies: Enemy[]) {
  for (const enemy of enemies) {
    enemy.draw(ctx);
  }
}

// TODO: Refactor - Move to appropriate file.
function renderRoute(ctx: CanvasRenderingContext2D, route: Position[]) {
  for (const node of route) {
    const { x, y } = node;
    ctx.fillStyle = '#94faff';
    ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}

function clearScreen(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
}

function main() {
  const canvas = getCanvas();
  const context = getContext(canvas);
  registerEventListeners(canvas, {
    'click': changeTileType,
  }, level);
  draw(canvas, context);
}

(() => {
  main();
})();
