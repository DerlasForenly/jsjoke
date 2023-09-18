import { Standing } from "../playerStates.js";
import { DIRECTIONS } from "../consts.js";

export default class Entity {
    constructor(game, name) {
        this.game = game;
        this.name = name;

        this.width = 0;
        this.height = 0;

        this.xSpeed = 0;
        this.ySpeed = 0;
        this.maxXSpeed = 0;
        this.maxYSpeed = 0;

        this.currentState = new Standing(this);
        this.currentState.enter();
    }

    draw(context) {;
        this.animation.draw(context);
    }

    updateDirection() {
        if (this.xSpeed > 0 && this.ySpeed === 0) {
            this.direction = DIRECTIONS.E;
        }
        if (this.xSpeed < 0 && this.ySpeed === 0) {
            this.direction = DIRECTIONS.W;
        }

        if (this.xSpeed === 0 && this.ySpeed < 0) {
            this.direction = DIRECTIONS.N;
        }
        if (this.xSpeed === 0 && this.ySpeed > 0) {
            this.direction = DIRECTIONS.S;
        }

        if (this.xSpeed > 0 && this.ySpeed < 0) {
            this.direction = DIRECTIONS.NE;
        }
        if (this.xSpeed > 0 && this.ySpeed > 0) {
            this.direction = DIRECTIONS.SE;
        }

        if (this.xSpeed < 0 && this.ySpeed < 0) {
            this.direction = DIRECTIONS.NW;
        }
        if (this.xSpeed < 0 && this.ySpeed > 0) {
            this.direction = DIRECTIONS.SW;
        }
    }

    setState(state) {
        this.currentState = state;
        this.currentState.enter();
    }

    getCenterX() {
        return this.x + (this.width / 2);
    }

    getCenterY() {
        return this.y + (this.height / 2);
    }

    getWorldXFloat() {
        const tile = this.getCenterTile();
        const offset = (tile.x - this.x) * -1;

        return tile.spawnWorldX + offset / tile.width;
    }

    getWorldYFloat() {
        const tile = this.getCenterTile();
        const offset = (tile.y - this.y) * -1;

        return tile.spawnWorldY + offset / tile.height;
    }

    getWorldXPixel() {
        const referenceTile = this.game.world.referenceTile;
        
        return Math.abs(referenceTile.x) + this.x;
    }

    getWorldYPixel() {
        const referenceTile = this.game.world.referenceTile;

        return Math.abs(referenceTile.y) + this.y;
    }

    getCenterTile() {
        const centerX = this.getWorldXPixel() + this.width / 2;
        const centerY = this.getWorldYPixel() + this.height / 2;

        const tileIndexX = (centerX - (centerX % 48)) / 48;
        const tileIndexY = (centerY - (centerY % 48)) / 48;

        return this.game.world.tiles[tileIndexX][tileIndexY]
    }

    /**
     * 
     * @param {Number} x 
     */
    getCanvasPositionFromWorldPixelPosition(x, y) {
        const referenceTile = this.game.world.referenceTile;

        const offsetX = x % referenceTile.width;
        const tileWorldX = (x - offsetX) / referenceTile.width;

        const offsetY = y % referenceTile.height;
        const tileWorldY = (y - offsetY) / referenceTile.height;

        const tile = this.game.world.tiles[tileWorldX][tileWorldY];

        return [tile.x + offsetX, tile.y + offsetY];
    }

    convertWorldXToCanvasX(x) {
        const referenceTile = this.game.world.referenceTile;

        const offsetX = x % referenceTile.width;
        const tileWorldX = (x - offsetX);

        console.log(tileWorldX);
    }
}