import MobAnimation from "../../Animations/MobAnimation.js";
import Entity from "../Entity.js";

export default class Slime extends Entity {
    static width = 36;
    static height = 22;
    
    /**
     * @param {Game} game 
     * @param {Object} config 
     */
    constructor(game, config) {
        super(game);
        this.name = config.name;

        this.width = Slime.width;
        this.height = Slime.height;

        this.x = game.world.referenceTile.x + config.worldX;
        this.y = game.world.referenceTile.y + config.worldY;

        this.lvl = config.lvl;
        this.maxHp = config.maxHp;
        this.hp = config.hp;
        this.def = config.def;
        this.exp = this.lvl * 10;

        this.animation = new MobAnimation(this);
        this.animation.maxFrame = 7;
    }

    draw(context) {;
        this.animation.draw(context);

        context.font = '12px Arial';
        context.fillStyle = 'white';
        context.strokeStyle = 'black';

        const name = this.name.split('_')[0] + ` [${this.lvl}]`;
        const nameWidth = context.measureText(name).width;
        const offsetX = (nameWidth - this.width) / 2

        context.strokeText(name, this.x - offsetX, this.y - 6);
        context.fillText(name, this.x - offsetX, this.y - 6);

        context.font = '10px Arial';
        context.fillStyle = 'black';
    }
}