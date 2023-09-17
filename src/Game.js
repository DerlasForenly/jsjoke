import Player from "./Player.js";
import InputHandler from "../src/InputHandler.js";
import World from "./World.js";
import Rock from "./Rock.js";
import MapEditor from "./MapEditor.js";
import Slime from "./Slime.js";
import { Map } from "./Map.js";
import Tile from "./Tile.js";

export default class Game {
    /**
     * 
     * @param {Number} width 
     * @param {Number} height 
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.world = new World(this, 60, 60);
        this.player = new Player(this, 6, 6);
        this.inputHandler = new InputHandler(this);
        this.mapEditor = new MapEditor(this.world);

        this.entities = this.loadEntities();
        this.world.tiles = this.loadWorld(Map);
    }

    /**
     * Draw all game elements
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        this.world.draw(context);
        this.entities.forEach(entity => {
            entity.draw(context);
        });
        this.player.draw(context);
    }

    /**
     * Update game elements before render
     * 
     * @param {Number} deltaTime 
     */
    update(deltaTime) {
        this.player.update(this.inputHandler.keys, deltaTime);
        this.entities.forEach(entity => {
            entity.update(deltaTime);
        });
    }

    loadEntities(entities) {
        return [new Rock(this, 7, 7), new Slime(this, 2, 2)];
    }

    loadWorld(tiles) {
        const maxX = Math.max(...Map.map(item => item.worldX));
        const maxY = Math.max(...Map.map(item => item.worldY));

        let twoDimArray = new Array(maxX + 1).fill(null).map(() => new Array(maxY + 1).fill(null));

        Map.forEach(item => {
            twoDimArray[item.worldX][item.worldY] = new Tile(this.world.game, item.worldX, item.worldY, item.spriteId); // You can store the object or any value you want here
        });

        return twoDimArray;
    }
}