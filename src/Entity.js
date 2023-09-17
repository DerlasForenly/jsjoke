import { Standing } from "./playerStates.js";
import { DIRECTIONS } from "./consts.js";

export default class Entity {
    constructor(game, worldX, worldY) {
        this.game = game;

        this.width = 0;
        this.height = 0;

        this.spawnWorldX = worldX;
        this.spawnWorldY = worldY;

        this.xSpeed = 0;
        this.ySpeed = 0;
        this.maxXSpeed = 0;
        this.maxYSpeed = 0;

        this.currentState = new Standing(this);
        this.currentState.enter();
    }

    draw(context) {
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

    calculateSpawnPointX() {
        const tile = this.game.world.tiles[this.spawnWorldX][this.spawnWorldY];

        const centerX = tile.getCenterX();

        const spawnX = centerX - (this.width / 2);

        return spawnX;
    }

    calculateSpawnPointY() {
        const tile = this.game.world.tiles[this.spawnWorldX][this.spawnWorldY];

        const centerY = tile.getCenterY();

        const spawnY = centerY - (this.height / 2);

        return spawnY;
    }
}