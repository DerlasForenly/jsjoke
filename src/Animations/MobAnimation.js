import Entity from "../Entities/Entity.js";
import Animation from "./Animation.js";

export default class MobAnimation extends Animation {
    /**
     * 
     * @param {Entity} entity 
     */
    constructor(entity) {
        super(entity);
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        const referenceTile = this.entity.game.world.tiles[0][0];

        context.drawImage(
            this.entity.image,
            this.frameX * this.entity.width, 
            this.frameY * this.entity.height, 
            this.entity.width, 
            this.entity.height, 
            this.entity.x + referenceTile.x, 
            this.entity.y + referenceTile.y, 
            this.entity.width, 
            this.entity.height
        );
    }
}