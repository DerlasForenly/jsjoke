import TileAnimation from "../Animations/TileAnimation.js";
import Entity from "./Entity.js";
import Spawner from "./Spawner.js";
import TileEvent from "./TileEvent.js";
import Area from "./Area.js";

export const TILE_SIZE = 48;

export default class Tile extends Entity {
    /**
     * @param {Game} game reference to game
     * @param {Number} indexX index in world tiles array
     * @param {Number} indexY index in world tiles array
     * @param {Layer[]} layers array of sprite ids
     */
    constructor(game, layers, indexX, indexY) {
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
        this.x = indexX * TILE_SIZE;
        this.y = indexY * TILE_SIZE;

        this.indexX = indexX;
        this.indexY = indexY;
        
        this.animation = new TileAnimation(this, layers);
        this.event = null;
        this.spawner = null;
        this.area = null;
    }

    /**
     * 
     * @param {*} deltaTime 
     */
    update(deltaTime) {
        this.spawner?.update(deltaTime);
        this.animation.animate(deltaTime);
    }

    /**
     * 
     * @param {*} context 
     */
    draw(context) {
        this.animation.draw(context);
        //context.fillText(`${this.getWorldXPixel() / 48};${this.getWorldYPixel() / 48}`, this.x + 2, this.y + 11);
    }

    /**
     * Set spawner for enemies
     * 
     * @param {Entyti[]} enemies
     */
    setSpawner(enemies) {
        this.spawner = new Spawner(this, enemies);
    }

    /**
     * Set event that activates what current player steps on the tile
     * 
     * @todo
     * @param {TileEvent} event 
     */
    setEvent(event) {
        this.event = new TileEvent(this);
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