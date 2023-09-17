import { DIRECTIONS } from "../consts.js";
import Entity from "./Entity.js";
import { RemotePlayerAnimation } from "../Animation.js";

export default class Player extends Entity {
    constructor(game, worldX, worldY, name) {
        super(game, worldX, worldY);

        this.name = name;

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
        this.animation = new RemotePlayerAnimation(this);
    }

    update(deltaTime) {
        this.animation.animate(deltaTime);
    }
}