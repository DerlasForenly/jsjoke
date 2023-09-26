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

        canvas.addEventListener('mousemove', e => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        canvas.addEventListener("mousedown", (event) => {
            const rect = canvas.getBoundingClientRect();
            this.mouseX = event.clientX - rect.left;
            this.mouseY = event.clientY - rect.top;

            let mobClick = false;
            for (const key in game.mobs) {
                let mob = game.mobs[key];
                mob.isSelectedByPlayer = false;

                if (
                    mob.x - 10 <= this.mouseX && 
                    mob.x + 10 + mob.width >= this.mouseX && 
                    mob.y - 10 <= this.mouseY && 
                    mob.y + 10 + mob.height >= this.mouseY
                ) {
                    game.player.selectedEntity = mob;
                    mob.isSelectedByPlayer = true;
                    mobClick = true;
                }
            }

            if (!mobClick) {
                this.isMouseDown = true;
            }
        });
          
        canvas.addEventListener("mouseup", (event) => {
            this.isMouseDown = false;
            this.keys = [];
        });

        canvas.addEventListener('touchstart', e => {
            this.isMouseDown = true;
        });

        canvas.addEventListener('touchend', e => {
            this.isMouseDown = false;
            this.keys = [];
        });

        canvas.addEventListener('click', (event) => {
            let rect = canvas.getBoundingClientRect();
            this.mouseX = event.clientX - rect.left;
            this.mouseY = event.clientY - rect.top;

            game.world.tiles.forEach(row => {
                row.forEach(tile => {
                    if (
                        tile.x <= this.mouseX && 
                        tile.x + tile.width >= this.mouseX && 
                        tile.y <= this.mouseY && 
                        tile.y + tile.width >= this.mouseY
                    ) {
                        //console.log(tile)
                    }
                })
            });
        });
    }
}
