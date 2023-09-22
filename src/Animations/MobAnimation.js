import Entity from "../Entities/Entity.js";
import Animation from "./Animation.js";

const colors = [
    'blue',
    'green',
    'ghost',
    'ice',
    'honey',
    'pink',
];

export default class MobAnimation extends Animation {
    /**
     * 
     * @param {Entity} entity 
     */
    constructor(entity) {
        super(entity);

        this.image = document.getElementById(`slime_${colors[Math.floor(Math.random() * 6)]}`);
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        const referenceTile = this.entity.game.world.tiles[0][0];

        context.drawImage(
            this.image,
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