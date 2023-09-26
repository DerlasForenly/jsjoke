import { DIRECTIONS, PLAYER_STATES } from "../consts.js";
import Moving from "../States/Moving.js";
import Standing from "../States/Standing.js";

export default class Entity {
    constructor(game) {
        this.game = game;

        this.width = 0;
        this.height = 0;

        this.xSpeed = 0;
        this.ySpeed = 0;
        this.maxXSpeed = 0;
        this.maxYSpeed = 0;

        this.lvl = 0;
        this.def = 0;
        this.hp = 0;

        this.isSelectedByPlayer = false;

        this.currentState = null;
    }

    draw(context) {;
        this.animation.draw(context);
    }

    update(deltaTime) {
        this.move();
        this.animation.animate(deltaTime);
    }

    move() {
        this.x += -this.xSpeed;
        this.y += -this.ySpeed;
    }

    setSpeedByDirection(direction, speed) {
        this.direction = direction;

        if (speed) {
            switch (direction) {
                case DIRECTIONS.W:
                    this.xSpeed = +1;
                    this.ySpeed = 0;
                    break;
                case DIRECTIONS.E:
                    this.xSpeed = -1;
                    this.ySpeed = 0;
                    break;
                case DIRECTIONS.S:
                    this.xSpeed = 0;
                    this.ySpeed = -1;
                    break;
                case DIRECTIONS.N:
                    this.xSpeed = 0;
                    this.ySpeed = +1;
                    break;

                case DIRECTIONS.NE:
                    this.xSpeed = -1;
                    this.ySpeed = +1;
                    break;
                case DIRECTIONS.NW:
                    this.xSpeed = +1;
                    this.ySpeed = +1;
                    break;
                case DIRECTIONS.SE:
                    this.xSpeed = -1;
                    this.ySpeed = -1;
                    break;
                case DIRECTIONS.SW:
                    this.xSpeed = +1;
                    this.ySpeed = -1;
                    break;
            }
        } else {
            this.xSpeed = 0;
            this.ySpeed = 0;
        }
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

    setStateWithId(stateId) {
        switch (stateId) {
            case PLAYER_STATES.STANDING: 
                this.currentState = new Standing(this);
                break;
            case PLAYER_STATES.MOVING: 
                this.currentState = new Moving(this);
                break;
            default:
                this.currentState = new Standing(this);
                break;
        }

        this.currentState.enter();
    }

    getCenterX() {
        return this.x + (this.width / 2);
    }

    getCenterY() {
        return this.y + (this.height / 2);
    }

    getWorldXPixel() {
        return Math.abs(this.game.world.referenceTile.x) + this.x;
    }

    getWorldYPixel() {
        return Math.abs(this.game.world.referenceTile.y) + this.y;
    }

    getCenterTile() {
        const centerX = this.getWorldXPixel() + this.width / 2;
        const centerY = this.getWorldYPixel() + this.height / 2;

        const tileIndexX = (centerX - (centerX % 48)) / 48;
        const tileIndexY = (centerY - (centerY % 48)) / 48;

        return this.game.world.tiles[tileIndexX][tileIndexY]
    }

    getIntersectionTiles() {
        let tiles = [];

        if (this.getCenterTile().x === this.x) {
            return [this.getCenterTile()];
        }

        const upperLeftX = this.getWorldXPixel();
        const upperLeftY = this.getWorldYPixel();
        let tileIndexX = (upperLeftX - (upperLeftX % 48)) / 48;
        let tileIndexY = (upperLeftY - (upperLeftY % 48)) / 48;
        tiles.push(this.game.world.tiles[tileIndexX][tileIndexY]);

        const upperRightX = this.getWorldXPixel() + this.width;
        const upperRightY = this.getWorldYPixel();
        tileIndexX = (upperRightX - (upperRightX % 48)) / 48;
        tileIndexY = (upperRightY - (upperRightY % 48)) / 48;
        tiles.push(this.game.world.tiles[tileIndexX][tileIndexY]);

        if (this.getCenterTile().y === this.y) {
            return tiles;
        }

        const lowerRightX = this.getWorldXPixel() + this.width;
        const lowerRightY = this.getWorldYPixel() + this.height;
        tileIndexX = (lowerRightX - (lowerRightX % 48)) / 48;
        tileIndexY = (lowerRightY - (lowerRightY % 48)) / 48;
        tiles.push(this.game.world.tiles[tileIndexX][tileIndexY]);

        const lowerLeftX = this.getWorldXPixel();
        const lowerLeftY = this.getWorldYPixel() + this.height;
        tileIndexX = (lowerLeftX - (lowerLeftX % 48)) / 48;
        tileIndexY = (lowerLeftY - (lowerLeftY % 48)) / 48;
        tiles.push(this.game.world.tiles[tileIndexX][tileIndexY]);

        return tiles;
    }

    /**
     * @param {Number} x 
     */
    getCanvasPositionFromWorldPixelPosition(x, y) {
        const referenceTile = this.game.world.referenceTile;

        return [referenceTile.x + x, referenceTile.y + y];
    }
    
    getSpeed() {
        return this.xSpeed || this.ySpeed;
    }
}