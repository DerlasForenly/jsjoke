import Player from "./Player.js";
import CurrentPlayerAnimation from "../Animations/CurrentPlayerAnimation.js";
import Standing from "../States/Standing.js";
import { TILE_SIZE } from "./Tile.js";

export default class CurrentPlayer extends Player {
    constructor(game, name, worldX, worldY) {
        super(game, name, worldX, worldY);

        this.animation = new CurrentPlayerAnimation(this);

        this.currentState = new Standing(this);
        this.currentState.enter();

        this.movePlayerX = false;
        this.movePlayerY = false;

        this.maxXSpeed = 1;
        this.maxYSpeed = 1;

        this.diagonalSwitcher = false;

        this.alingCamera();
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

    /**
     * Hard to understand shit
     */
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
                    leftTiles.push(this.game.world.getTile(leftIndexX, i));
                }
        
                leftTiles.forEach(tile => {
                    if (tile?.isPassable === false) {
                        this.xSpeed = 0;
                    }
                })
            } else if (this.xSpeed < 0) {
                const rightIndexX = (worldXPixel - TILE_SIZE + this.width) / TILE_SIZE;

                let rightTiles = [];
                for (let i = minIndexY; i <= maxIndexY; i++) {
                    rightTiles.push(this.game.world.getTile(rightIndexX + 1, i));
                }
        
                rightTiles.forEach(tile => {
                    if (tile?.isPassable === false) {
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
                    upperTiles.push(this.game.world.getTile(i, upperIndexY));
                }
        
                upperTiles.forEach(tile => {
                    if (tile?.isPassable === false) {
                        this.ySpeed = 0;
                    }
                })
            } else if (this.ySpeed < 0) {
                const lowerIndexY = (worldYPixel + this.height - TILE_SIZE) / TILE_SIZE;
                
                let lowerTiles = [];
                for (let i = minIndexX; i <= maxIndexX; i++) {
                    lowerTiles.push(this.game.world.getTile(i, lowerIndexY + 1));
                }
        
                lowerTiles.forEach(tile => {
                    if (tile?.isPassable === false) {
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

                tile = this.game.world.getTile(indexX - 1, indexY - 1);
            }

            if (this.xSpeed < 0 && this.ySpeed > 0) {
                const indexX = (worldXPixel + this.width) / 48;
                const indexY = worldYPixel / 48;

                tile = this.game.world.getTile(indexX, indexY - 1);
            }

            if (this.xSpeed < 0 && this.ySpeed < 0) {
                indexX = (worldXPixel + this.width) / 48;
                indexY = (worldYPixel + this.height) / 48;

                tile = this.game.world.getTile(indexX + 1, indexY + 1);
            }

            if (this.xSpeed > 0 && this.ySpeed < 0) {
                indexX = worldXPixel / 48;
                indexY = (worldYPixel + this.height) / 48;

                tile = this.game.world.getTile(indexX - 1, indexY);
            }

            if (tile?.isPassable === false) {
                this.xSpeed = 0;
                this.ySpeed = 0;
            }
        }
    }

    moveCamera() {
        this.handlePlayScreenBorders();
        this.handleObstacle();

        // It brokes direction calculation
        //this.updateDiagonalSwitcher();

        const center = 288;
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

            if (this.x === center) {
                this.movePlayerX = false;
            }
        } else {
            this.game.world.moveAllTilesX(this.xSpeed);
            this.game.moveAllPlayersX(this.xSpeed);
        }

        if (this.movePlayerY) {
            this.y += -this.ySpeed;

            if (this.y === center) {
                this.movePlayerY = false;
            }
        } else {
            this.game.world.moveAllTilesY(this.ySpeed);
            this.game.moveAllPlayersY(this.ySpeed);
        }
    }

    updateDiagonalSwitcher() {
        if (this.diagonalSwitcher === false && this.xSpeed != 0 && this.ySpeed !== 0) {
            this.xSpeed = 0;
            this.diagonalSwitcher = true;
        } else if (this.diagonalSwitcher === true && this.xSpeed != 0 && this.ySpeed !== 0) {
            this.ySpeed = 0;
            this.diagonalSwitcher = false;
        }
    }

    alingCamera() {
        const centerX = 288;
        const centerY = 288;

        const rightCenterX = this.game.world.worldXSize * 48 - 288 - 48;
        const lowerCenterY = this.game.world.worldYSize * 48 - 288 - 48;

        const playerWorldX = this.getWorldXPixel();
        const playerWorldY = this.getWorldYPixel();

        this.movePlayerX = playerWorldX <= centerX;
        this.movePlayerY = playerWorldY <= centerY;

        if (!this.movePlayerX) {
            const offsetX = playerWorldX - centerX;

            this.game.world.moveAllTilesX(-offsetX);
            this.game.moveAllEntitiesX(-offsetX);
            this.game.moveAllPlayersX(-offsetX);

            this.x = centerX;
        }

        if (!this.movePlayerY) {
            const offsetY = playerWorldY - centerY;

            this.game.world.moveAllTilesY(-offsetY);
            this.game.moveAllEntitiesY(-offsetY);
            this.game.moveAllPlayersY(-offsetY);

            this.y = centerY;
        }

        if (playerWorldX >= rightCenterX) {
            const offsetX = playerWorldX - rightCenterX;
            this.x += offsetX;
            
            this.game.world.moveAllTilesX(offsetX);
            this.game.moveAllEntitiesX(offsetX);
            this.game.moveAllPlayersX(offsetX);

            this.movePlayerX = true;
        }

        if (playerWorldY >= lowerCenterY) {
            const offsetY = playerWorldX - rightCenterX;
            this.y += offsetY;
            
            this.game.world.moveAllTilesY(offsetY);
            this.game.moveAllEntitiesY(offsetY);
            this.game.moveAllPlayersY(offsetY);

            this.movePlayerY = true;
        }
    }
}