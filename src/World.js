import Tile from "./Tile.js";

export default class World {
    constructor(game, tiles = []) {
        this.game = game;

        this.worldXSize = Math.max(...tiles.map(item => item.worldX));
        this.worldYSize = Math.max(...tiles.map(item => item.worldY));

        this.minWorldX = 0;
        this.minWorldY = 0;

        this.tiles = new Array(this.worldXSize + 1).fill(null).map(() => new Array(this.worldYSize + 1).fill(null));

        tiles.forEach(item => {
            this.tiles[item.worldX][item.worldY] = new Tile(this.game, item.worldX, item.worldY, item.spriteId);
        });
    }

    draw(context) {
        for (let i = 0; i < this.worldXSize; i++) {
            for (let j = 0; j < this.worldXSize; j++) {
                this.tiles[i][j].draw(context);
            }
        }
    }
}