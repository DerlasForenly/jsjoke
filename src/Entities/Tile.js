import TileAnimation from "../Animations/TileAnimation.js";
import Entity from "./Entity.js";

export const TILE_SIZE = 48;

export default class Tile extends Entity {
    /**
     * @param {Game} game 
     * @param {Number} worldX 
     * @param {Number} worldY 
     * @param {Layer[]} layers 
     */
    constructor(game, layers, indexX, indexY) {
        super(game);

        // Set during sprite loading inside animation
        this.isPassable = true;

        this.width = TILE_SIZE;
        this.height = TILE_SIZE;
        this.x = indexX * TILE_SIZE;
        this.y = indexY * TILE_SIZE;

        this.indexX = indexX;
        this.indexY = indexY;
        
        this.animation = new TileAnimation(this, layers);
    }

    draw(context) {
        this.animation.draw(context);
        //context.fillText(`${this.getWorldXPixel() / 48};${this.getWorldYPixel() / 48}`, this.x + 2, this.y + 11);
    }

    getIsPassable(layers) {
        let isPassable = false;

        layers.forEach(element => {
            
        });

        return isPassable;
    }
}