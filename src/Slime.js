import { MobAnimation } from "./Animation.js";
import Entity from "./Entity.js";

const colors = [
    'blue',
]

export default class Slime extends Entity {
    constructor(game, worldX, worldY) {
        super(game, worldX, worldY);

        this.width = 36;
        this.height = 22;

        this.x = this.calculateSpawnPointX();
        this.y = this.calculateSpawnPointY();

        this.animation = new MobAnimation(this);
        this.animation.maxFrame = 7;

        this.image = document.getElementById(`slime_${colors[0]}`);
    }

    update(deltaTime) {
        this.animation.animate(deltaTime);
    }
}