import { TileAnimation } from "../Animation.js";
import Entity from "./Entity.js";
import { IMPASSABLE_TILES } from "../consts.js";

const TILE_SIZE = 48;

export default class Tile extends Entity {
    /**
     * @param {Game} game 
     * @param {Number} worldX 
     * @param {Number} worldY 
     * @param {String} spriteId 
     * @param {Boolean} isimpassable
     */
    constructor(game, spriteId, worldX, worldY) {
        super(game, spriteId, worldX, worldY);

        this.isImpassable = this.getIsImpassanle(spriteId);

        this.width = TILE_SIZE;
        this.height = TILE_SIZE;

        this.x = worldX * this.width;
        this.y = worldY * this.height;

        this.spriteId = spriteId;
        
        this.animation = new TileAnimation(this);
        this.image = document.getElementById(spriteId);
    }

    draw(context) {
        this.animation.draw(context);
        context.fillText(`${this.getCenterTile().getWorldXPixel() / 48};${this.getCenterTile().getWorldYPixel() / 48}`, this.x + 2, this.y + 11);
    }

    setSprite(spriteId) {
        this.spriteId = spriteId;
        this.image = document.getElementById(spriteId);
    }

    getIsImpassanle(spriteId) {
        if (IMPASSABLE_TILES.includes(spriteId)) {
            return true;
        }

        return false;
    }
}