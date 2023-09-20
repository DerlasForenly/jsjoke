import Player from "./Player.js";
import { PlayerAnimation } from "../Animation.js";
import { Standing } from "../playerStates.js";
import { TILE_SIZE } from "./Tile.js";
import { DIRECTIONS } from "../consts.js";

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
        const worldYPixel = this.getWorldYPixel();
        const worldXPixel = this.getWorldXPixel();

        if (worldXPixel % TILE_SIZE === 0) {
            const minIndexYOffset = worldYPixel % TILE_SIZE;
            const maxIndexYOffset = (worldYPixel + this.height - 1) % TILE_SIZE

            const minIndexY = (worldYPixel - minIndexYOffset) / TILE_SIZE;
            const maxIndexY = (worldYPixel + this.height - 1 - maxIndexYOffset) / TILE_SIZE;

            if (this.xSpeed > 0) {
                const leftIndexX = (worldXPixel - TILE_SIZE) / TILE_SIZE;
                
                let leftTiles = [];
                for (let i = minIndexY; i <= maxIndexY; i++) {
                    leftTiles.push(this.game.world.tiles[leftIndexX][i]);
                }
        
                leftTiles.forEach(tile => {
                    if (tile.isImpassable) {
                        this.xSpeed = 0;
                    }
                })
            } else if (this.xSpeed < 0) {
                const rightIndexX = (worldXPixel - TILE_SIZE + this.width) / TILE_SIZE;

                let rightTiles = [];
                for (let i = minIndexY; i <= maxIndexY; i++) {
                    rightTiles.push(this.game.world.tiles[rightIndexX + 1][i]);
                }
        
                rightTiles.forEach(tile => {
                    if (tile.isImpassable) {
                        this.xSpeed = 0;
                    }
                })
            }
        }

        if (worldYPixel % TILE_SIZE === 0) {
            const minIndexXOffset = worldXPixel % TILE_SIZE;
            const maxIndexXOffset = (worldXPixel + this.width - 1) % TILE_SIZE

            const minIndexX = (worldXPixel - minIndexXOffset) / TILE_SIZE;
            const maxIndexX = (worldXPixel + this.width - 1 - maxIndexXOffset) / TILE_SIZE;

            if (this.ySpeed > 0) {
                const upperIndexY = (worldYPixel - TILE_SIZE) / TILE_SIZE;
                
                let upperTiles = [];
                for (let i = minIndexX; i <= maxIndexX; i++) {
                    upperTiles.push(this.game.world.tiles[i][upperIndexY]);
                }
        
                upperTiles.forEach(tile => {
                    if (tile.isImpassable) {
                        this.ySpeed = 0;
                    }
                })
            } else if (this.ySpeed < 0) {
                const lowerIndexY = (worldYPixel + this.height - TILE_SIZE) / TILE_SIZE;
                
                let lowerTiles = [];
                for (let i = minIndexX; i <= maxIndexX; i++) {
                    lowerTiles.push(this.game.world.tiles[i][lowerIndexY + 1]);
                }
        
                lowerTiles.forEach(tile => {
                    if (tile.isImpassable) {
                        this.ySpeed = 0;
                    }
                })
            }
        }

        if (worldYPixel % TILE_SIZE === 0 && worldXPixel % TILE_SIZE === 0 && this.xSpeed !== 0 && this.ySpeed !== 0) {
            let indexX = null;
            let indexY = null;
            let tile = null;

            if (this.xSpeed > 0 && this.ySpeed > 0) {
                indexX = worldXPixel / 48;
                indexY = worldYPixel / 48;

                tile = this.game.world.tiles[indexX - 1][indexY - 1];
            }

            if (this.xSpeed < 0 && this.ySpeed > 0) {
                const indexX = (worldXPixel + this.width) / 48;
                const indexY = worldYPixel / 48;

                tile = this.game.world.tiles[indexX][indexY - 1];
            }

            if (this.xSpeed < 0 && this.ySpeed < 0) {
                indexX = (worldXPixel + this.width) / 48;
                indexY = (worldYPixel + this.height) / 48;

                tile = this.game.world.tiles[indexX + 1][indexY + 1];
            }

            if (this.xSpeed > 0 && this.ySpeed < 0) {
                indexX = worldXPixel / 48;
                indexY = (worldYPixel + this.height) / 48;

                tile = this.game.world.tiles[indexX - 1][indexY];
            }

            if (tile?.isImpassable) {
                this.xSpeed = 0;
                this.ySpeed = 0;
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