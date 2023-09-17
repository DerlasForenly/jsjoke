import Tile from "./Tile.js";

export default class World {
    constructor(game, sizeX, sizeY) {
        this.game = game;

        this.tiles = [];

        this.worldXSize = sizeX;
        this.worldYSize = sizeY;

        this.minWorldX = 0;
        this.minWorldY = 0;
        this.maxWorldX = 60;
        this.maxWorldY = 60;

        for (let i = 0; i <= this.worldXSize; i++) {
            this.tiles.push([]);

            for (let j = 0; j <= this.worldYSize; j++) {
                this.tiles[i].push(new Tile(this.game, i, j));
            }
        }
    }

    draw(context) {
        for (let i = 0; i < this.worldXSize; i++) {
            for (let j = 0; j < this.worldXSize; j++) {
                this.tiles[i][j].draw(context);
            }
        }
    }
}