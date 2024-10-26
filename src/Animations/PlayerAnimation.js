import { DIRECTIONS } from "../consts.js";
import Standing from "../States/Standing.js";
import Animation from "./Animation.js";

export class PlayerAnimation extends Animation {
    /**
     * @param {Player} entity 
     */
    constructor(entity) {
        super(entity);
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        switch (this.entity.direction) {
            case DIRECTIONS.W:
                this.frameY = 1;
                break;
            case DIRECTIONS.E:
                this.frameY = 2;
                break;
            case DIRECTIONS.SW:
            case DIRECTIONS.SE:
            case DIRECTIONS.S:
                this.frameY = 0;
                break;
            case DIRECTIONS.NE:
            case DIRECTIONS.NW:
            case DIRECTIONS.N:
                this.frameY = 3;
                break;
        }

        if (this.entity.currentState instanceof Standing) {
            this.frameY = 5;
        }

        context.drawImage(
            this.entity.image,
            this.frameX * this.entity.width, 
            this.frameY * this.entity.height, 
            this.entity.width, 
            this.entity.height, 
            this.entity.x, 
            this.entity.y, 
            this.entity.width, 
            this.entity.height
        );
    }
}
