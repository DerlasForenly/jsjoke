import Player from "./Player.js";
import { PlayerAnimation } from "../Animation.js";
import { DIRECTIONS } from "../consts.js";

export default class CurrentPlayer extends Player {
    constructor(game, name, worldX, worldY) {
        super(game, name, worldX, worldY);

        this.animation = new PlayerAnimation(this);

        //this.alingCamera();
    }

    update(input, deltaTime) {
        this.handleInput(input);
        this.moveCamera();

        this.currentState.handleInput(input);
        this.animation.animate(deltaTime);
    }

    handleOpositInputs(input) {
        if (input.includes('ArrowRight') && input.includes('ArrowLeft')) {
            this.xSpeed = 0;
        }
        if (input.includes('ArrowDown') && input.includes('ArrowUp')) {
            this.ySpeed = 0;
        }
    }

    handleInputRelease(input) {
        if (!input.includes('ArrowDown') && !input.includes('ArrowUp')) {
            this.ySpeed = 0;
        }
        if (!input.includes('ArrowRight') && !input.includes('ArrowLeft')) {
            this.xSpeed = 0;
        }
    }

    handlePlayScreenBorders() {
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > this.game.width - this.width) {
            this.x = this.game.width - this.width;
        }

        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > this.game.height - this.height) {
            this.y = this.game.height - this.height;
        }
    }

    handleInput(input) {
        if (input.includes('ArrowLeft')) {
            this.xSpeed = this.maxXSpeed;
        }
        if (input.includes('ArrowRight')) {
            this.xSpeed = -this.maxXSpeed;
        }
        if (input.includes('ArrowUp')) {
            this.ySpeed = this.maxYSpeed;
        }
        if (input.includes('ArrowDown')) {
            this.ySpeed = -this.maxYSpeed;
        }
        if (input.includes('Enter')) {
            console.log('Enter has been pressed');
        }

        this.handleInputRelease(input);
        this.handleOpositInputs(input);
    }

    handleObstacle() {
        if (this.xSpeed > 0) {
            const leftTiles = this.getLeftTiles();
            leftTiles.forEach(tile => {
                if (tile.isImpassable && tile.getWorldXPixel() + tile.width === this.getWorldXPixel()) {
                    this.xSpeed = 0;
                }
            });

        }
        if (this.xSpeed < 0) {
            const rightTiles = this.getRightTiles();
            rightTiles.forEach(tile => {
                if (tile.isImpassable && tile.getWorldXPixel() === this.getWorldXPixel() + this.width) {
                    this.xSpeed = 0;
                }
            });
        }

        if (this.ySpeed < 0) {
            const lowerTiles = this.getLowerTiles();
            lowerTiles.forEach(tile => {
                if (tile.isImpassable && tile.getWorldYPixel() === this.getWorldYPixel() + this.height) {
                    this.ySpeed = 0;
                }
            });
        }
        if (this.ySpeed > 0) {
            const upperTiles = this.getUpperTiles();
            upperTiles.forEach(tile => {
                if (tile.isImpassable && tile.getWorldYPixel() + tile.height === this.getWorldYPixel()) {
                    this.ySpeed = 0;
                }
            });
        }
    }

    moveCamera() {
        this.handlePlayScreenBorders();
        this.handleObstacle();

        const upperLeft = this.game.world.referenceTile;
        const lowerRight = this.game.world.tiles[this.game.world.worldXSize][this.game.world.worldYSize];

        if (upperLeft.x === 0 && this.xSpeed > 0) {
            this.movePlayerX = true;
        }
        if (lowerRight.x === this.game.width && this.xSpeed < 0) {
            this.movePlayerX = true;
        }
        if (upperLeft.y === 0 && this.ySpeed > 0) {
            this.movePlayerY = true;
        }
        if (lowerRight.y === this.game.height && this.ySpeed < 0) {
            this.movePlayerY = true;
        }

        if (this.movePlayerX) {
            this.x += -this.xSpeed;

            if (this.x === 6 * this.width) {
                this.movePlayerX = false;
            }
        } else {
            this.game.world.tiles.forEach(row => {
                row.forEach(tile => {
                    tile.x += this.xSpeed;
                });
            });
        }

        if (this.movePlayerY) {
            this.y += -this.ySpeed;

            if (this.y === 6 * this.height) {
                this.movePlayerY = false;
            }
        } else {
            this.game.world.tiles.forEach(row => {
                row.forEach(tile => {
                    tile.y += this.ySpeed;
                });
            });
        }
    }

    alingCamera() {
        const canvas = document.getElementById('canvas1');
        const context = canvas.getContext('2d');

        // Define the center point (where you want the view to be centered)
        const centerX = this.getCenterX(); // Replace with your desired X-coordinate
        const centerY = this.getCenterY(); // Replace with your desired Y-coordinate

        // Calculate the translation values to set the view center to the desired point
        const translateX = canvas.width / 2 - centerX;
        const translateY = canvas.height / 2 - centerY;

        // Use the translate() method to set the canvas view center to the desired point
        context.translate(translateX, translateY);
    }
}