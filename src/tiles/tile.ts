import config from '../config.js';

export enum TileType {
  GOAL,
  GRASS,
  START,
  WATER,
  TOP_LEFT_CORNER_PATH,
  TOP_RIGHT_CORNER_PATH,
  BOTTOM_LEFT_CORNER_PATH,
  BOTTOM_RIGHT_CORNER_PATH,
  VERTICAL_PATH,
  HORIZONTAL_PATH,
  PATH,
  BOTTOM_EDGE_PATH,
  RIGHT_EDGE_PATH,
  TOP_EDGE_PATH,
  LEFT_EDGE_PATH,
}

export class Tile {
  protected image = new Image();
  protected occupied = false;

  constructor(protected type: TileType) {
    switch (type) {
      case TileType.GOAL:
        this.image.src = `${config.assets.path}/images/chest.png`;
        break;
      case TileType.GRASS:
        this.image.src = `${config.assets.path}/images/grass.png`;
        break;
      case TileType.START:
        this.image.src = `${config.assets.path}/images/cave.png`;
        break;
      case TileType.WATER:
        this.image.src = `${config.assets.path}/images/water.png`;
        break;
      case TileType.TOP_LEFT_CORNER_PATH:
        this.image.src = `${config.assets.path}/images/topLeftCornerPath.png`;
        break;
      case TileType.TOP_RIGHT_CORNER_PATH:
        this.image.src = `${config.assets.path}/images/topRightCornerPath.png`;
        break;
      case TileType.BOTTOM_LEFT_CORNER_PATH:
        this.image.src = `${config.assets.path}/images/bottomLeftCornerPath.png`;
        break;
      case TileType.BOTTOM_RIGHT_CORNER_PATH:
        this.image.src = `${config.assets.path}/images/bottomRightCornerPath.png`;
        break;
      case TileType.VERTICAL_PATH:
        this.image.src = `${config.assets.path}/images/verticalPath.png`;
        break;
      case TileType.HORIZONTAL_PATH:
        this.image.src = `${config.assets.path}/images/horizontalPath.png`;
        break;
      case TileType.PATH:
        this.image.src = `${config.assets.path}/images/path.png`;
        break;
      case TileType.BOTTOM_EDGE_PATH:
        this.image.src = `${config.assets.path}/images/bottomEdgePath.png`;
        break;
      case TileType.RIGHT_EDGE_PATH:
        this.image.src = `${config.assets.path}/images/rightEdgePath.png`;
        break;
      case TileType.TOP_EDGE_PATH:
        this.image.src = `${config.assets.path}/images/topEdgePath.png`;
        break;
      case TileType.LEFT_EDGE_PATH:
        this.image.src = `${config.assets.path}/images/leftEdgePath.png`;
        break;
      default:
        throw new Error(`Unknown TileType in Tile constructor... ${type}`);
    }
  }

  public getType(): TileType {
    return this.type;
  }

  public getImage(): HTMLImageElement {
    return this.image;
  }

  public setOccupied(occupied: boolean): void {
    this.occupied = occupied;
  }

  public isOccupied(): boolean {
    return this.occupied;
  }

  isPath() {
    return (
      this.type === TileType.GOAL ||
      this.type === TileType.START ||
      this.type === TileType.TOP_LEFT_CORNER_PATH ||
      this.type === TileType.TOP_RIGHT_CORNER_PATH ||
      this.type === TileType.BOTTOM_LEFT_CORNER_PATH ||
      this.type === TileType.BOTTOM_RIGHT_CORNER_PATH ||
      this.type === TileType.VERTICAL_PATH ||
      this.type === TileType.HORIZONTAL_PATH ||
      this.type === TileType.PATH ||
      this.type === TileType.BOTTOM_EDGE_PATH ||
      this.type === TileType.RIGHT_EDGE_PATH ||
      this.type === TileType.TOP_EDGE_PATH ||
      this.type === TileType.LEFT_EDGE_PATH
    );
  }
}
