import { DIRECTIONS, PLAYER_STATES } from "../consts.js";
import { Moving, Standing } from "../playerStates.js";

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

    setSpeedByDirection(direction) {
        this.direction = direction;

        if (this.currentState instanceof Moving) {
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
        }
    }

    updateDirection() {
        if (this.xSpeed < 0 && this.ySpeed === 0) {
            this.direction = DIRECTIONS.E;
        }
        if (this.xSpeed > 0 && this.ySpeed === 0) {
            this.direction = DIRECTIONS.W;
        }

        if (this.xSpeed === 0 && this.ySpeed > 0) {
            this.direction = DIRECTIONS.N;
        }
        if (this.xSpeed === 0 && this.ySpeed < 0) {
            this.direction = DIRECTIONS.S;
        }

        if (this.xSpeed < 0 && this.ySpeed > 0) {
            this.direction = DIRECTIONS.NE;
        }
        if (this.xSpeed < 0 && this.ySpeed < 0) {
            this.direction = DIRECTIONS.SE;
        }

        if (this.xSpeed > 0 && this.ySpeed > 0) {
            this.direction = DIRECTIONS.NW;
        }
        if (this.xSpeed > 0 && this.ySpeed < 0) {
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

    getUpperLeftTile() {
        const centerX = this.getWorldXPixel();
        const centerY = this.getWorldYPixel();

        const tileIndexX = (centerX - (centerX % 48)) / 48;
        const tileIndexY = (centerY - (centerY % 48)) / 48;

        if (tileIndexX < 0 || tileIndexX >= 60 || tileIndexY < 0 || tileIndexY >= 60) {
            return null;
        }

        return this.game.world.tiles[tileIndexX][tileIndexY];
    }

    getNextUpperLeftTile() {
        const upperLeft = this.getUpperLeftTile();

        if (upperLeft.indexX - 1 < 0 || upperLeft.indexY - 1 < 0) {
            return null;
        }

        return this.game.world.tiles[upperLeft.indexX - 1][upperLeft.indexY - 1];
    }

    getNextLowerLeftTile() {
        const upperLeft = this.getLowerLeftTile();

        if (upperLeft.indexX - 1 < 0 || upperLeft.indexY + 1 >= this.game.worldYSize) {
            return null;
        }

        return this.game.world.tiles[upperLeft.indexX - 1][upperLeft.indexY + 1];
    }

    getNextUpperRightTile() {
        const upperRight = this.getUpperRightTile();

        if (upperRight.indexX + 1 >= this.game.world.worldXSize || upperRight.indexY - 1 < 0) {
            return null;
        }

        return this.game.world.tiles[upperRight.indexX + 1][upperRight.indexY - 1];
    }

    getNextLowerRightTile() {
        const lowerRight = this.getLowerRightTile();

        if (lowerRight.indexX + 1 >= this.game.world.worldXSize || lowerRight.indexY + 1 >= this.game.worldYSize) {
            return null;
        }

        return this.game.world.tiles[lowerRight.indexX + 1][lowerRight.indexY + 1];
    }

    getUpperRightTile() {
        const centerX = this.getWorldXPixel() + this.width - 1;
        const centerY = this.getWorldYPixel();

        const tileIndexX = (centerX - (centerX % 48)) / 48;
        const tileIndexY = (centerY - (centerY % 48)) / 48;

        if (tileIndexX < 0 || tileIndexX >= 60 || tileIndexY < 0 || tileIndexY >= 60) {
            return null;
        }

        return this.game.world.tiles[tileIndexX][tileIndexY]
    }

    getLowerRightTile() {
        const centerX = this.getWorldXPixel() + this.width - 1;
        const centerY = this.getWorldYPixel() + this.height - 1;

        const tileIndexX = (centerX - (centerX % 48)) / 48;
        const tileIndexY = (centerY - (centerY % 48)) / 48;

        if (tileIndexX < 0 || tileIndexX >= 60 || tileIndexY < 0 || tileIndexY >= 60) {
            return null;
        }

        return this.game.world.tiles[tileIndexX][tileIndexY]
    }

    getLowerLeftTile() {
        const centerX = this.getWorldXPixel();
        const centerY = this.getWorldYPixel() + this.height - 1;

        const tileIndexX = (centerX - (centerX % 48)) / 48;
        const tileIndexY = (centerY - (centerY % 48)) / 48;

        if (tileIndexX < 0 || tileIndexX >= 60 || tileIndexY < 0 || tileIndexY >= 60) {
            return null;
        }

        return this.game.world.tiles[tileIndexX][tileIndexY];
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
     * 
     * @param {Number} x 
     */
    getCanvasPositionFromWorldPixelPosition(x, y) {
        const referenceTile = this.game.world.referenceTile;

        return [referenceTile.x + x, referenceTile.y + y];
    }

    getUpperTiles() {
        //create logic for many tiles between left and right
        const upperLeft = this.getUpperLeftTile();
        const upperRight = this.getUpperRightTile();

        if (upperLeft.indexY - 1 < 0) {
            return [null, null];
        }

        const nextUpperLeft = this.game.world.tiles[upperLeft.indexX][upperLeft.indexY - 1];
        const nextUpperRight = this.game.world.tiles[upperRight.indexX][upperRight.indexY - 1];

        return [nextUpperLeft, nextUpperRight];
    }

    getLowerTiles() {
        //create logic for many tiles between left and right
        const lowerLeft = this.getLowerLeftTile();
        const lowerRight = this.getLowerRightTile();

        if (lowerLeft.indexY + 1 >= this.game.world.worldYSize) {
            return [null, null];
        }

        const nextLowerLeft = this.game.world.tiles[lowerLeft.indexX][lowerLeft.indexY + 1];
        const nextLowerRight = this.game.world.tiles[lowerRight.indexX][lowerRight.indexY + 1];
        
        return [nextLowerLeft, nextLowerRight];
    }

    getLeftTiles() {
        //create logic for many tiles between left and right
        const upperLeft = this.getUpperLeftTile();
        const lowerLeft = this.getLowerLeftTile();

        if (upperLeft.indexX - 1 < 0) {
            return [null, null];
        }

        const nextUpperLeft = this.game.world.tiles[upperLeft.indexX - 1][upperLeft.indexY];
        const nextLowerLeft = this.game.world.tiles[lowerLeft.indexX - 1][lowerLeft.indexY];
        
        return [nextUpperLeft, nextLowerLeft];
    }

    getRightTiles() {
        //create logic for many tiles between left and right
        const upperRight = this.getUpperRightTile();
        const lowerRight = this.getLowerRightTile();

        if (upperRight.indexX + 1 >= this.game.world.worldXSize) {
            return [null, null];
        }

        const nextUpperRight = this.game.world.tiles[upperRight.indexX + 1][upperRight.indexY];
        const nextLowerRight = this.game.world.tiles[lowerRight.indexX + 1][lowerRight.indexY];
        
        return [nextUpperRight, nextLowerRight];
    }
}