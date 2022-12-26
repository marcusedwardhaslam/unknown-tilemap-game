export var TileType;
(function (TileType) {
    TileType[TileType["GRASS"] = 0] = "GRASS";
    TileType[TileType["SAND"] = 1] = "SAND";
    TileType[TileType["START"] = 2] = "START";
    TileType[TileType["GOAL"] = 3] = "GOAL";
    TileType[TileType["WATER"] = 4] = "WATER";
})(TileType || (TileType = {}));
export class Tile {
    constructor(type) {
        this.type = type;
    }
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
                return '#0000FF';
            default:
                throw new Error('Unknown TileType in Tile.getGraphic()');
        }
    }
    getType() {
        return this.type;
    }
    setType(type) {
        this.type = type;
    }
    isPath() {
        return this.type === TileType.GOAL || this.type === TileType.START || this.type === TileType.SAND;
    }
}
