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

    draw(context) {;
        this.animation.draw(context);

        context.font = '12px Arial';
        context.fillStyle = 'white';
        context.strokeStyle = 'black';

        const nameWidth = context.measureText(this.name).width;
        const offsetX = (nameWidth - this.width) / 2

        context.strokeText(this.name, this.x - offsetX, this.y - 6);
        context.fillText(this.name, this.x - offsetX, this.y - 6);

        context.font = '10px Arial';
        context.fillStyle = 'black';
    }
}