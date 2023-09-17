import Player from "./Player.js";
import { PlayerAnimation } from "../Animation.js";

export default class CurrentPlayer extends Player {
    constructor(game, name, x, y) {
        super(game, name, x, y);

        this.animation = new PlayerAnimation(this);
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
        this.game.world.tiles.forEach(row => {
            row.forEach(tile => {
                if (tile.x <= this.getCenterX() && tile.x + tile.width >= this.getCenterX() && tile.y <= this.getCenterY() && tile.y + tile.width >= this.getCenterY()) {
                    tile.setSprite('land_s');
                } else if (tile.spriteId === 'land_s') {
                    tile.setSprite('land');
                }
            })
        });
    }

    moveCamera() {
        this.handlePlayScreenBorders();
        this.handleObstacle();

        this.game.world.tiles.forEach(row => {
            row.forEach(tile => {
                if (tile.spawnWorldX === 0 && tile.x >= 0 && this.xSpeed > 0) {
                    this.movePlayerX = true;
                }
                if (tile.spawnWorldX === this.game.world.worldXSize && tile.x <= this.game.width && this.xSpeed < 0) {
                    this.movePlayerX = true;
                }

                if (tile.spawnWorldY === 0 && tile.y >= 0 && this.ySpeed > 0) {
                    this.movePlayerY = true;
                }
                if (tile.spawnWorldY === this.game.world.worldYSize && tile.y <= this.game.height && this.ySpeed < 0) {
                    this.movePlayerY = true;
                }
            });
        });

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