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
    static width = 36;
    static height = 22;
    
    constructor(game, name, worldX, worldY) {
        super(game, name);

        this.width = Slime.width;
        this.height = Slime.height;

        this.x = game.world.referenceTile.x + worldX;
        this.y = game.world.referenceTile.y + worldY;

        this.animation = new MobAnimation(this);
        this.animation.maxFrame = 7;

        this.image = document.getElementById(`slime_${colors[Math.floor(Math.random() * 6)]}`);
    }

    update(deltaTime) {
        this.animation.animate(deltaTime);
    }
}