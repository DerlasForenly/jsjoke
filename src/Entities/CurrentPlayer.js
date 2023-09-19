import Player from "./Player.js";
import { PlayerAnimation } from "../Animation.js";
import { DIRECTIONS } from "../consts.js";
import { Standing } from "../playerStates.js";

export default class CurrentPlayer extends Player {
    constructor(game, name, worldX, worldY) {
        super(game, name, worldX, worldY);

        this.animation = new PlayerAnimation(this);

        this.currentState = new Standing(this);
        this.currentState.enter();

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
        this.game.world.tiles.forEach(row => {
            row.forEach(tile => {
                if (tile.spriteId === 'land_s') {
                    tile.setSprite('land')
                } else if (tile.spriteId === 'rock_s') {
                    tile.setSprite('rockTile')
                }
            })
        });

        const nextUpperLeft = this.getNextUpperLeftTile();
        const nextLowerLeft = this.getNextLowerLeftTile();
        const nextUpperRight = this.getNextUpperRightTile();
        const nextLowerRight = this.getNextLowerRightTile();

        if (this.xSpeed > 0) {
            this.getLeftTiles().forEach(tile => {
                if (tile?.isImpassable && tile.getWorldXPixel() + tile.width === this.getWorldXPixel()) {
                    this.xSpeed = 0;
                }
            });

            if (nextUpperLeft.spriteId === 'land') {
                nextUpperLeft.setSprite('land_s')
            } else if (nextUpperLeft.spriteId === 'rockTile') {
                nextUpperLeft.setSprite('rock_s')
            }

            if (nextLowerLeft.spriteId === 'land') {
                nextLowerLeft.setSprite('land_s')
            } else if (nextLowerLeft.spriteId === 'rockTile') {
                nextLowerLeft.setSprite('rock_s')
            }

            this.getLeftTiles().forEach(tile => {
                if (tile.spriteId === 'land') {
                    tile.setSprite('land_s')
                } else if (tile.spriteId === 'rockTile') {
                    tile.setSprite('rock_s')
                }
            });
        }
        if (this.xSpeed < 0) {
            this.getRightTiles().forEach(tile => {
                if (tile?.isImpassable && tile.getWorldXPixel() === this.getWorldXPixel() + this.width) {
                    this.xSpeed = 0;
                }
            });

            this.getRightTiles().forEach(tile => {
                if (tile.spriteId === 'land') {
                    tile.setSprite('land_s')
                } else if (tile.spriteId === 'rockTile') {
                    tile.setSprite('rock_s')
                }
            });

            if (nextUpperRight.spriteId === 'land') {
                nextUpperRight.setSprite('land_s')
            } else if (nextUpperRight.spriteId === 'rockTile') {
                nextUpperRight.setSprite('rock_s')
            }

            if (nextLowerRight.spriteId === 'land') {
                nextLowerRight.setSprite('land_s')
            } else if (nextLowerRight.spriteId === 'rockTile') {
                nextLowerRight.setSprite('rock_s')
            }
        }

        if (this.ySpeed < 0) {
            this.getLowerTiles().forEach(tile => {
                if (tile?.isImpassable && tile.getWorldYPixel() === this.getWorldYPixel() + this.height) {
                    this.ySpeed = 0;
                }
            });

            this.getLowerTiles().forEach(tile => {
                if (tile.spriteId === 'land') {
                    tile.setSprite('land_s')
                } else if (tile.spriteId === 'rockTile') {
                    tile.setSprite('rock_s')
                }
            });

            if (nextLowerLeft.spriteId === 'land') {
                nextLowerLeft.setSprite('land_s')
            } else if (nextLowerLeft.spriteId === 'rockTile') {
                nextLowerLeft.setSprite('rock_s')
            }

            if (nextLowerRight.spriteId === 'land') {
                nextLowerRight.setSprite('land_s')
            } else if (nextLowerRight.spriteId === 'rockTile') {
                nextLowerRight.setSprite('rock_s')
            }
        }
        if (this.ySpeed > 0) {
            this.getUpperTiles().forEach(tile => {
                if (tile?.isImpassable && tile.getWorldYPixel() + tile.height === this.getWorldYPixel()) {
                    this.ySpeed = 0;
                }
            });

            this.getUpperTiles().forEach(tile => {
                if (tile.spriteId === 'land') {
                    tile.setSprite('land_s')
                } else if (tile.spriteId === 'rockTile') {
                    tile.setSprite('rock_s')
                }
            });

            if (nextUpperLeft.spriteId === 'land') {
                nextUpperLeft.setSprite('land_s')
            } else if (nextUpperLeft.spriteId === 'rockTile') {
                nextUpperLeft.setSprite('rock_s')
            }

            if (nextUpperRight.spriteId === 'land') {
                nextUpperRight.setSprite('land_s')
            } else if (nextUpperRight.spriteId === 'rockTile') {
                nextUpperRight.setSprite('rock_s')
            }
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