import Entity from "./Entity.js";
import Player from "./Player.js";
import Tile from "./Tile.js";
import { DIRECTIONS } from "./consts.js";
import { Standing } from "./playerStates.js";

export class Animation {
    /**
     * 
     * @param {Entity} entity 
     */
    constructor(entity) {
        this.entity = entity;

        this.fps = 9;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;

        this.maxFrame = 3;
        this.reverceFrame = false; // current frames directions, by defaulf from left to right
        this.reverceAnimation = true;

        this.frameX = 0;
        this.frameY = 0;
    }

    /**
     * You can ran animation in a loop like this frames order 0, 1, 2, 3, 2, 1, 0
     * 
     * @param {Number} deltaTime 
     */
    animate(deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;

            if (this.reverceAnimation) {
                if (this.reverceFrame) {
                    this.frameX--;
        
                    if (this.frameX < 0) {
                        this.frameX = 0;
                        this.reverceFrame = false;
                    }
                } else {
                    this.frameX++;
                    if (this.frameX === this.maxFrame) {
                        this.frameX = this.maxFrame - 1;
                        this.reverceFrame = true;
                    }
                }
            } else {
                this.frameX++;

                if (this.frameX === this.maxFrame) {
                    this.frameX = 0;
                }
            }

        } else {
            this.frameTimer += deltaTime;
        }
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {

    }
}

export class TileAnimation extends Animation {
    /**
     * 
     * @param {Tile} entity 
     */
    constructor(entity) {
        super(entity);

        this.maxFrame = 1;
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
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

export class MobAnimation extends Animation {
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

export class PlayerAnimation extends Animation {
    /**
     * 
     * @param {Player} entity 
     */
    constructor(entity) {
        super(entity);

        
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        this.entity.updateDirection();

        switch (this.entity.direction) {
            case DIRECTIONS.W:
                this.frameY = 2;
                break;
            case DIRECTIONS.E:
                this.frameY = 1;
                break;
            case DIRECTIONS.S:
                this.frameY = 3;
                break;
            case DIRECTIONS.N:
                this.frameY = 0;
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