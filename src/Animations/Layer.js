import { TileConfigs } from "../DTO/TileConfigs.js";

export default class Layer {
    /**
     * @param {TileAnimation} animation 
     * @param {String} spriteId 
     */
    constructor(animation, spriteId) {
        this.animation = animation;
        this.spriteId = spriteId;

        const config = TileConfigs[spriteId];

        this.image = document.getElementById(config.tileset_id);
        this.frameX = config.frameX;
        this.frameY = config.frameY;
        this.isAnimated = config.isAnimated;

        // Set isPassable until gets first "false" value
        if (this.animation.entity.isPassable) {
            this.animation.entity.isPassable = config.isPassable;
        }
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        const entity = this.animation.entity;

        context.drawImage(
            this.image,
            this.frameX * entity.width, 
            this.frameY * entity.height, 
            entity.width, 
            entity.height, 
            entity.x, 
            entity.y, 
            entity.width, 
            entity.height
        );
    }
}