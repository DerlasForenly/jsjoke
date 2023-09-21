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
            this.tiles[item.indexX][item.indexY] = new Tile(this.game, item.layers, item.indexX, item.indexY);
        });

        this.referenceTile = this.tiles[0][0];
    }

    /**
     * 
     * @param {*} context 
     */
    draw(context) {
        for (let i = 0; i < this.worldXSize; i++) {
            for (let j = 0; j < this.worldXSize; j++) {
                this.tiles[i][j].draw(context);
            }
        }
    }

    /**
     * Safe way to get tile from array
     * 
     * @param {Number} indexX 
     * @param {Number} indexY 
     * @returns 
     */
    getTile(indexX, indexY) {
        if (indexX < 0 || indexX >= this.worldXSize || indexY < 0 || indexY >= this.worldYSize) {
            return null;
        }

        return this.tiles[indexX][indexY];
    }

    /**
     * Move all tiles in X coordinates
     * 
     * @param {Number} offset 
     */
    moveAllTilesX(offset) {
        this.tiles.forEach(row => {
            row.forEach(tile => {
                tile.x = tile.x + offset;
            })
        })
    }

    /**
     * Move all tiles in Y coordinates
     * 
     * @param {Number} offset 
     */
    moveAllTilesY(offset) {
        this.tiles.forEach(row => {
            row.forEach(tile => {
                tile.y = tile.y + offset;
            })
        })
    }
}