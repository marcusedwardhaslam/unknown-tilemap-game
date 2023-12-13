import config from '../config.js';
export var TileType;
(function (TileType) {
    TileType[TileType["GOAL"] = 0] = "GOAL";
    TileType[TileType["GRASS"] = 1] = "GRASS";
    TileType[TileType["START"] = 2] = "START";
    TileType[TileType["WATER"] = 3] = "WATER";
    TileType[TileType["TOP_LEFT_CORNER_PATH"] = 4] = "TOP_LEFT_CORNER_PATH";
    TileType[TileType["TOP_RIGHT_CORNER_PATH"] = 5] = "TOP_RIGHT_CORNER_PATH";
    TileType[TileType["BOTTOM_LEFT_CORNER_PATH"] = 6] = "BOTTOM_LEFT_CORNER_PATH";
    TileType[TileType["BOTTOM_RIGHT_CORNER_PATH"] = 7] = "BOTTOM_RIGHT_CORNER_PATH";
    TileType[TileType["VERTICAL_PATH"] = 8] = "VERTICAL_PATH";
    TileType[TileType["HORIZONTAL_PATH"] = 9] = "HORIZONTAL_PATH";
    TileType[TileType["PATH"] = 10] = "PATH";
    TileType[TileType["BOTTOM_EDGE_PATH"] = 11] = "BOTTOM_EDGE_PATH";
    TileType[TileType["RIGHT_EDGE_PATH"] = 12] = "RIGHT_EDGE_PATH";
    TileType[TileType["TOP_EDGE_PATH"] = 13] = "TOP_EDGE_PATH";
    TileType[TileType["LEFT_EDGE_PATH"] = 14] = "LEFT_EDGE_PATH";
})(TileType || (TileType = {}));
export class Tile {
    constructor(type) {
        this.type = type;
        this.image = new Image();
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
    getType() {
        return this.type;
    }
    getImage() {
        return this.image;
    }
    isPath() {
        return (this.type === TileType.GOAL ||
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
            this.type === TileType.LEFT_EDGE_PATH);
    }
}
