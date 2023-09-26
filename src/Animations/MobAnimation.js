import Entity from "../Entities/Entity.js";
import Animation from "./Animation.js";

const colors = [
    'blue',
    'green',
    'ghost',
    'ice',
    'honey',
    'pink',
];

export default class MobAnimation extends Animation {
    /**
     * 
     * @param {Entity} entity 
     */
    constructor(entity) {
        super(entity);

        this.image = document.getElementById(`slime_${colors[Math.floor(Math.random() * 6)]}`);
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        context.drawImage(
            this.image,
            this.frameX * this.entity.width, 
            this.frameY * this.entity.height, 
            this.entity.width, 
            this.entity.height, 
            this.entity.x, 
            this.entity.y, 
            this.entity.width, 
            this.entity.height
        );

        if (this.entity.isSelectedByPlayer) {
            context.strokeStyle = 'red';
            context.lineWidth = 2;
            context.strokeRect(this.entity.x - 8, this.entity.y - 10, this.entity.width + 16, this.entity.height + 20);
        }

        this.drawHpBar(context)
        context.lineWidth = 1;
    }

    drawHpBar(context) {
        // Define border properties
        const borderWidth = 5; // Width of the line in pixels
        const borderColor = 'lightgreen'; // Color of the line

        // Draw a line under the image
        context.strokeStyle = borderColor;
        context.lineWidth = borderWidth;

        const lineY = this.entity.y + this.entity.height + 3; // Adjust the Y position as needed
        const length = this.entity.hp * this.entity.width / this.entity.maxHp;
        context.beginPath();
        context.moveTo(this.entity.x, lineY);
        context.lineTo(this.entity.x + length, lineY);
        context.stroke();
    }
}