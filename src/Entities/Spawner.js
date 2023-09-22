export default class Spawner {
    /**
     * 
     * @param {Tile} tile 
     * @param {Entity[]} mobs 
     * @param {Number} frequency 
     */
    constructor(tile, mobs = [], frequency = 10) {
        this.tile = tile;
        this.mobs = mobs
        this.frequency = frequency;
    }

    update(deltaTime) {
        
    }
}