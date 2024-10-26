export default class Animation {
    /**
     * 
     * @param {Entity} entity 
     */
    constructor(entity) {
        this.entity = entity;

        this.fps = 9;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;

        this.maxFrame = 3;
        this.reverceFrame = false; // current frames directions, by defaulf from left to right
        this.reverceAnimation = true;

        this.frameX = 0;
        this.frameY = 0;
    }

    /**
     * You can ran animation in a loop like this frames order 0, 1, 2, 3, 2, 1, 0
     * 
     * @param {Number} deltaTime 
     */
    animate(deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;

            if (this.reverceAnimation) {
                if (this.reverceFrame) {
                    this.frameX--;
        
                    if (this.frameX < 0) {
                        this.frameX = 0;
                        this.reverceFrame = false;
                    }
                } else {
                    this.frameX++;
                    if (this.frameX === this.maxFrame) {
                        this.frameX = this.maxFrame - 1;
                        this.reverceFrame = true;
                    }
                }
            } else {
                this.frameX++;

                if (this.frameX === this.maxFrame) {
                    this.frameX = 0;
                }
            }

        } else {
            this.frameTimer += deltaTime;
        }
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {}
}