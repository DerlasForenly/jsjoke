import Player from "./Player.js";
import CurrentPlayerAnimation from "../Animations/CurrentPlayerAnimation.js";
import Standing from "../States/Standing.js";
import { TILE_SIZE } from "./Tile.js";
import Skill from "../Skills/Skill.js";
import Casting from "../States/Casting.js";
import { CLIENT_CAST_SKILL } from "../../emits.js";

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

        this.lvl = 1;
        this.def = 0;
        this.hp = 20;

        this.skills = [
            new Skill(this, "Base attack"),
            new Skill(this, "Fireball"),
        ]

        this.diagonalSwitcher = false;

        this.selectedEntity = null;

        this.alingCamera();
    }

    update(input, deltaTime) {
        this.handleInput(input);
        this.handlePlayScreenBorders();
        this.handleObstacle();
        this.moveCamera();

        this.currentState.handleInput(input.keys);
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
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.x >= this.game.width - this.width) {
            this.x = this.game.width - this.width;
        }

        if (this.y <= 0) {
            this.y = 0;
        }
        if (this.y >= this.game.height - this.height) {
            this.y = this.game.height - this.height;
        }
    }

    handleInput(input) {
        this.xSpeed = 0;
        this.ySpeed = 0;

        if (input.keys.includes('ArrowLeft')) {
            this.xSpeed = -this.maxXSpeed;
        }
        if (input.keys.includes('ArrowRight')) {
            this.xSpeed = this.maxXSpeed;
        }
        if (input.keys.includes('ArrowUp')) {
            this.ySpeed = -this.maxYSpeed;
        }
        if (input.keys.includes('ArrowDown')) {
            this.ySpeed = this.maxYSpeed;
        }
        if (input.keys.includes('Enter')) {
            console.log('Enter has been pressed');
        }

        if (input.keys.includes("1")) {
            this.castSkill(0);
        }
        if (input.keys.includes("2")) {
            this.castSkill(1);
        }
        
        if (input.isMouseDown) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            input.keys = [];
            const mouseX = input.mouseX;
            const mouseY = input.mouseY;

            const deltaX = mouseX - centerX;
            const deltaY = mouseY - centerY;
            
            const angle = Math.atan2(deltaY, deltaX);
            
            this.xSpeed = Math.round(Math.cos(angle) * this.maxXSpeed);
            this.ySpeed = Math.round(Math.sin(angle) * this.maxYSpeed);

            if (this.xSpeed > 0) {
                input.keys.push('ArrowLeft');
                this.xSpeed = this.maxXSpeed;
            } else if (this.xSpeed < 0) {
                input.keys.push('ArrowRight');
                this.xSpeed = -this.maxXSpeed;
            }

            if (this.ySpeed > 0) {
                input.keys.push('ArrowUp');
                this.ySpeed = this.maxYSpeed;
            }
            if (this.ySpeed < 0) {
                input.keys.push('ArrowDown');
                this.ySpeed = -this.maxYSpeed;
            }
        }
        

        this.handleInputRelease(input.keys);
        this.handleOpositInputs(input.keys);
    }

    /**
     * @param {Number} skillNumber 
     */
    castSkill(skillNumber) {
        if (this.selectedEntity && !(this.state instanceof Casting)) {
            //this.setState(new Casting());

            this.game.socket.emit(CLIENT_CAST_SKILL, {
                skill: this.skills[skillNumber].name,
                enemy: this.selectedEntity.name,
            });
        }
    }

    /**
     * Hard to understand shit
     */
    handleObstacle() {
        const baseWorldY = this.getWorldYPixel();
        const baseWorldX = this.getWorldXPixel();

        if (this.xSpeed > 0) {
            const worldX = baseWorldX + 1;
            const worldY = baseWorldY;

            const minIndexY = Math.floor(worldY / TILE_SIZE);
            const maxIndexY = Math.floor((worldY + this.height - 1) / TILE_SIZE);
            const rightIndexX = Math.floor((worldX + this.width - 1) / TILE_SIZE);

            for (let i = minIndexY; i <= maxIndexY; i++) {
                const tile = this.game.world.getTile(rightIndexX, i);
                if (tile && !tile.isPassable) {
                    this.xSpeed = 0;
                    break;
                }
            }
        } else if (this.xSpeed < 0) {
            const worldX = baseWorldX - 1;
            const worldY = baseWorldY;

            const minIndexY = Math.floor(worldY / TILE_SIZE);
            const maxIndexY = Math.floor((worldY + this.height - 1) / TILE_SIZE);
            const leftIndexX = Math.floor(worldX / TILE_SIZE);

            for (let i = minIndexY; i <= maxIndexY; i++) {
                const tile = this.game.world.getTile(leftIndexX, i);
                if (tile && !tile.isPassable) {
                    this.xSpeed = 0;
                    break;
                }
            }
        }

        if (this.ySpeed > 0) {
            const worldX = baseWorldX;
            const worldY = baseWorldY + 1;

            const minIndexX = Math.floor(worldX / TILE_SIZE);
            const maxIndexX = Math.floor((worldX + this.width - 1) / TILE_SIZE);
            const bottomIndexY = Math.floor((worldY + this.height - 1) / TILE_SIZE);

            for (let i = minIndexX; i <= maxIndexX; i++) {
                const tile = this.game.world.getTile(i, bottomIndexY);
                if (tile && !tile.isPassable) {
                    this.ySpeed = 0;
                    break;
                }
            }
        } else if (this.ySpeed < 0) {
            const worldX = baseWorldX;
            const worldY = baseWorldY - 1;

            const minIndexX = Math.floor(worldX / TILE_SIZE);
            const maxIndexX = Math.floor((worldX + this.width - 1) / TILE_SIZE);
            const topIndexY = Math.floor(worldY / TILE_SIZE);

            for (let i = minIndexX; i <= maxIndexX; i++) {
                const tile = this.game.world.getTile(i, topIndexY);
                if (tile && !tile.isPassable) {
                    this.ySpeed = 0;
                    break;
                }
            }
        }
    }

    moveCamera() {
        // It brokes direction calculation
        //this.updateDiagonalSwitcher();;

        const center = 288;
        const upperLeft = this.game.world.referenceTile;
        const lowerRight = this.game.world.tiles[this.game.world.worldXSize][this.game.world.worldYSize];

        if (upperLeft.x === 0 && this.xSpeed < 0) {
            this.movePlayerX = true;
        }
        if (lowerRight.x === this.game.width && this.xSpeed > 0) {
            this.movePlayerX = true;
        }
        if (upperLeft.y === 0 && this.ySpeed < 0) {
            this.movePlayerY = true;
        }
        if (lowerRight.y === this.game.height && this.ySpeed > 0) {
            this.movePlayerY = true;
        }

        if (this.movePlayerX) {
            this.x += this.xSpeed;

            if (this.x === center) {
                this.movePlayerX = false;
            }
        } else {
            this.game.world.moveAllTilesX(-this.xSpeed);
            this.game.moveAllEntitiesX(-this.xSpeed);
        }

        if (this.movePlayerY) {
            this.y += this.ySpeed;

            if (this.y === center) {
                this.movePlayerY = false;
            }
        } else {
            this.game.world.moveAllTilesY(-this.ySpeed);
            this.game.moveAllEntitiesY(-this.ySpeed);
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

            this.x = centerX;
        }

        if (!this.movePlayerY) {
            const offsetY = playerWorldY - centerY;

            this.game.world.moveAllTilesY(-offsetY);
            this.game.moveAllEntitiesY(-offsetY);

            this.y = centerY;
        }

        if (playerWorldX >= rightCenterX) {
            const offsetX = playerWorldX - rightCenterX;
            this.x += offsetX;
            
            this.game.world.moveAllTilesX(offsetX);
            this.game.moveAllEntitiesX(offsetX);

            this.movePlayerX = true;
        }

        if (playerWorldY >= lowerCenterY) {
            const offsetY = playerWorldX - rightCenterX;
            this.y += offsetY;
            
            this.game.world.moveAllTilesY(offsetY);
            this.game.moveAllEntitiesY(offsetY);

            this.movePlayerY = true;
        }
    }
}
