import { DIRECTIONS } from "./consts.js";
import Entity from "./Entity.js";
import { PlayerAnimation } from "./Animation.js";

export default class Player extends Entity {
    constructor(game, worldX, worldY) {
        super(game, worldX, worldY);

        this.direction = DIRECTIONS.S;

        this.width = 48;
        this.height = 48;

        this.maxXSpeed = 1;
        this.maxYSpeed = 1;

        this.x = this.calculateSpawnPointX();
        this.y = this.calculateSpawnPointY();

        this.movePlayerX = false;
        this.movePlayerY = false;

        this.image = document.getElementById('player');
        this.animation = new PlayerAnimation(this);
    }

    update(deltaTime) {
        this.animation.animate(deltaTime);
    }
}