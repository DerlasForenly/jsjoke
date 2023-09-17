import { MobAnimation } from "../Animation.js";
import Entity from "./Entity.js";

const colors = [
    'blue',
    'green',
    'ghost',
    'ice',
    'honey',
    'pink',
]

export default class Slime extends Entity {
    constructor(game, name, x, y) {
        super(game, name);

        this.width = 36;
        this.height = 22;

        const point = this.getCanvasPositionFromWorldPixelPosition(x, y);

        this.x = point[0];
        this.y = point[1];

        this.animation = new MobAnimation(this);
        this.animation.maxFrame = 7;

        this.image = document.getElementById(`slime_${colors[Math.floor(Math.random() * 6)]}`);
    }

    update(deltaTime) {
        this.animation.animate(deltaTime);
    }
}