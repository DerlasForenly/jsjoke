import Tile from "./Entities/Tile.js";

export default class World {
    constructor(game, tiles = []) {
        this.game = game;

        this.worldXSize = Math.max(...tiles.map(item => item.indexX));
        this.worldYSize = Math.max(...tiles.map(item => item.indexY));

        this.minWorldX = 0;
        this.minWorldY = 0;

        this.tiles = new Array(this.worldXSize + 1).fill(null).map(() => new Array(this.worldYSize + 1).fill(null));

        tiles.forEach(item => {
            this.tiles[item.indexX][item.indexY] = new Tile(this.game, item.spriteId, item.indexX, item.indexY);
        });

        this.referenceTile = this.tiles[0][0];
    }

    draw(context) {
        for (let i = 0; i < this.worldXSize; i++) {
            for (let j = 0; j < this.worldXSize; j++) {
                this.tiles[i][j].draw(context);
            }
        }
    }
}