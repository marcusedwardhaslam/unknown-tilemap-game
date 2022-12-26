export enum TileType {
  GRASS,
  SAND,
  START,
  GOAL,
  WATER,
}

export class Tile {
  constructor(private type: TileType) {}

  getGraphic() {
    switch (this.type) {
      case TileType.GOAL:
        return '#498e10';
      case TileType.GRASS:
        return '#9ECB91';
      case TileType.SAND:
        return '#9B7653';
      case TileType.START:
        return '#8e1010';
      case TileType.WATER:
        return '#94faff';
      default:
        throw new Error('Unknown TileType in Tile.getGraphic()')
    }
  }

  getType() {
    return this.type;
  }

  setType(type: TileType) {
    this.type = type;
  }

  isPath() {
    return this.type === TileType.GOAL || this.type === TileType.START || this.type === TileType.SAND;
  }
}
