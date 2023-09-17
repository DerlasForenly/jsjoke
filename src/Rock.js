import { MobAnimation } from "./Animation.js";
import Entity from "./Entity.js";

export default class Rock extends Entity {
    constructor(game) {
        super(game);

        this.width = 48;
        this.height = 48;

        this.x = 8 * this.width;
        this.y = 6 * this.height;

        this.animation = new MobAnimation(this);

        this.image = document.getElementById('rock');
    }

    /**
     * 
     * @param {Number} deltaTime 
     */
    update(deltaTime) {
        this.animation.animate(deltaTime);
    }
}