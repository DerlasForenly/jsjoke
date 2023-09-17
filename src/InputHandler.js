import Game from "./Game.js";
import { KEYS } from "./consts.js";

export default class InputHandler {
    /**
     * 
     * @param {Game} game 
     */
    constructor(game) {
        this.game = game;
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

        canvas.addEventListener('click', function(event) {
            var rect = canvas.getBoundingClientRect();
            var mouseX = event.clientX - rect.left;
            var mouseY = event.clientY - rect.top;

            console.log(mouseX, mouseY);

            if (game.mapEditor.isActive) {
                // Update to find exact element, not loop it
                game.world.tiles.forEach(row => {
                    row.forEach(tile => {
                        if (tile.x <= mouseX && tile.x + tile.width >= mouseX && tile.y <= mouseY && tile.y + tile.width >= mouseY) {
                            console.log(tile);
                            tile.setSprite(game.mapEditor.activeTile);
                        }
                    })
                });
            }
        });
    }
}