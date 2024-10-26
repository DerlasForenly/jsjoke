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
            this.tiles[item.indexX][item.indexY] = new Tile(this.game, item);;
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
     * Move all tiles in X coordinates
     * 
     * @param {Number} offset 
     */
    moveAllTilesX(offset) {
        this.tiles.forEach(row => {
            row.forEach(tile => {
                tile.x = tile.x + offset;
            });
        });
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
            });
        });
    }

    getRandomAdditionalLayer(layers) {
        const layer2 = [
            'Зелене листя',
            'Жовтувате листя',
            'Жовте листя',
        ];

        const layer3 = [
            'pumpkin',
            'pumpkin_jack',
            'glowing_pumpkin_jack',
            'пугало',
            'yellow_bush',
            'sunflower_left',
            'sunflower_right',
            'pumpkin_with_grass',
            'сніп',
        ];

        let randomItem = Math.floor(Math.random() * 10) - 1;
        if (randomItem >= 0 && randomItem < layer2.length) {
            layers.push(layer2[randomItem]);
        }

        randomItem = Math.floor(Math.random() * 100) - 1;
        if (randomItem >= 0 && randomItem < layer3.length) {
            layers.push(layer3[randomItem]);
        }

        return layers;
    }
    
    /**
     * Safe way to get tile
     * 
     * @param {Number} indexX 
     * @param {Number} indexY 
     */
    getTile(indexX, indexY) {
        if (
            indexX < 0 || 
            indexY < 0 ||
            indexX >= this.worldXSize ||
            indexY >= this.worldYSize
        ) {
            return null;
        }

        return this.tiles[indexX][indexY];
    }
}