import TileAnimation from "../Animations/TileAnimation.js";
import Entity from "./Entity.js";
import Area from "./Area.js";

export const TILE_SIZE = 48;

export default class Tile extends Entity {
    /**
     * @param {Game} game reference to game
     * @param {Number} indexX index in world tiles array
     * @param {Number} indexY index in world tiles array
     * @param {Layer[]} layers array of sprite ids
     */
    constructor(game, config) {
        super(game);

        /*
            Sets during sprite loading inside animation.
            Some layers can be passable and some cannot.
            If at least 1 layer is not passable then entire tile
            becomes impassable.
        */
        this.isPassable = true;

        this.width = TILE_SIZE;
        this.height = TILE_SIZE;
        this.x = config.indexX * TILE_SIZE;
        this.y = config.indexY * TILE_SIZE;

        this.indexX = config.indexX;
        this.indexY = config.indexY;
        
        this.animation = new TileAnimation(this, config.layers);
        this.event = null;
        this.spawners = config?.spawners;
        this.area = null;
    }

    /**
     * 
     * @param {*} deltaTime 
     */
    update(deltaTime) {
        this.animation.animate(deltaTime);
    }

    /**
     * 
     * @param {*} context 
     */
    draw(context) {
        this.animation.draw(context);
        context.fillText(`${this.getWorldXPixel() / TILE_SIZE};${this.getWorldYPixel() / TILE_SIZE}`, this.x + 2, this.y + 11);
    }

    /**
     * Assign tile for the area
     * 
     * @todo
     * @param {Area} area 
     */
    setArea(area) {
        this.area = new Area(this.game, area);
    }
}