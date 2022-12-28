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

  constructor(protected type: TileType) {
    switch (type) {
      case TileType.GOAL:
        this.image.src = `${config.assets.path}/chest.png`;
        break;
      case TileType.GRASS:
        this.image.src = `${config.assets.path}/grass.png`;
        break;
      case TileType.START:
        this.image.src = `${config.assets.path}/cave.png`;
        break;
      case TileType.WATER:
        this.image.src = `${config.assets.path}/water.png`;
        break;
      case TileType.TOP_LEFT_CORNER_PATH:
        this.image.src = `${config.assets.path}/topLeftCornerPath.png`;
        break;
      case TileType.TOP_RIGHT_CORNER_PATH:
        this.image.src = `${config.assets.path}/topRightCornerPath.png`;
        break;
      case TileType.BOTTOM_LEFT_CORNER_PATH:
        this.image.src = `${config.assets.path}/bottomLeftCornerPath.png`;
        break;
      case TileType.BOTTOM_RIGHT_CORNER_PATH:
        this.image.src = `${config.assets.path}/bottomRightCornerPath.png`;
        break;
      case TileType.VERTICAL_PATH:
        this.image.src = `${config.assets.path}/verticalPath.png`;
        break;
      case TileType.HORIZONTAL_PATH:
        this.image.src = `${config.assets.path}/horizontalPath.png`;
        break;
      case TileType.PATH:
        this.image.src = `${config.assets.path}/path.png`;
        break;
      case TileType.BOTTOM_EDGE_PATH:
        this.image.src = `${config.assets.path}/bottomEdgePath.png`;
        break;
      case TileType.RIGHT_EDGE_PATH:
        this.image.src = `${config.assets.path}/rightEdgePath.png`;
        break;
      case TileType.TOP_EDGE_PATH:
        this.image.src = `${config.assets.path}/topEdgePath.png`;
        break;
      case TileType.LEFT_EDGE_PATH:
        this.image.src = `${config.assets.path}/leftEdgePath.png`;
        break;
      default:
        throw new Error(`Unknown TileType in Tile constructor... ${type}`);
    }
  }

  public getImage(): HTMLImageElement {
    return this.image;
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
