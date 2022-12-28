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
})(TileType || (TileType = {}));
export class Tile {
    constructor(type) {
        this.type = type;
        this.image = new Image();
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
            default:
                throw new Error(`Unknown TileType in Tile constructor... ${type}`);
        }
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
            this.type === TileType.HORIZONTAL_PATH);
    }
}
