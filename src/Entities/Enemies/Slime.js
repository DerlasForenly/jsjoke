import MobAnimation from "../../Animations/MobAnimation.js";
import Entity from "../Entity.js";

export default class Slime extends Entity {
    static width = 36;
    static height = 22;
    
    constructor(game, name, worldX, worldY) {
        super(game);
        this.name = name;

        this.width = Slime.width;
        this.height = Slime.height;

        this.x = game.world.referenceTile.x + worldX;
        this.y = game.world.referenceTile.y + worldY;

        this.animation = new MobAnimation(this);
        this.animation.maxFrame = 7;
    }

    update(deltaTime) {
        this.animation.animate(deltaTime);
    }
}