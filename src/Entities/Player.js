import { DIRECTIONS } from "../consts.js";
import Entity from "./Entity.js";
import { RemotePlayerAnimation } from "../Animation.js";

export default class Player extends Entity {
    constructor(game, name, worldX, worldY) {
        super(game, name);

        this.direction = DIRECTIONS.S;

        this.width = 48;
        this.height = 48;

        this.maxXSpeed = 1;
        this.maxYSpeed = 1;

        const point = this.getCanvasPositionFromWorldPixelPosition(worldX, worldY);

        this.x = point[0];
        this.y = point[1];

        this.movePlayerX = false;
        this.movePlayerY = false;

        this.image = document.getElementById('player');
        this.animation = new RemotePlayerAnimation(this);
    }

    update(deltaTime) {
        this.animation.animate(deltaTime);
    }

    draw(context) {
        this.animation.draw(context)

        context.font = '11px Arial';
        context.fillStyle = 'white';

        const nameWidth = context.measureText(this.name).width;
        const offsetX = (nameWidth - this.width) / 2

        context.fillText(this.name, this.x - offsetX, this.y - 3);

        context.font = '10px Arial';
        context.fillStyle = 'black';
    }
}