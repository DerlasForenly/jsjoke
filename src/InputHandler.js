import Game from "./Game.js";
import { KEYS } from "./consts.js";

export default class InputHandler {
    /**
     * 
     * @param {Game} game 
     */
    constructor(game) {
        this.game = game;
        this.isMouseDown = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.keys = [];
        
        const canvas = document.getElementById('canvas1');

        window.addEventListener('keydown', e => {
            if (KEYS.includes(e.key) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
        });

        window.addEventListener('keyup', e => {
            if (KEYS.includes(e.key)) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });

        document.addEventListener('mousemove', e => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        document.addEventListener("mousedown", (event) => {
            this.isMouseDown = true;
        });
          
        document.addEventListener("mouseup", (event) => {
            this.isMouseDown = false;
            this.keys = [];
        });

        document.addEventListener('touchstart', e => {
            this.isMouseDown = true;
        });

        document.addEventListener('touchend', e => {
            this.isMouseDown = false;
            this.keys = [];
        });

        canvas.addEventListener('click', (event) => {
            let rect = canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left;
            let mouseY = event.clientY - rect.top;

            game.world.tiles.forEach(row => {
                row.forEach(tile => {
                    if (tile.x <= mouseX && tile.x + tile.width >= mouseX && tile.y <= mouseY && tile.y + tile.width >= mouseY) {
                        console.log(tile)
                    }
                })
            });
        });
    }
}
