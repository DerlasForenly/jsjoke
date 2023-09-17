import Player from "./Player.js";
import InputHandler from "../src/InputHandler.js";
import World from "./World.js";
import MapEditor from "./MapEditor.js";
import { Map } from "./Map.js";
import { Entities, classMapping } from "./Entities.js";

export default class Game {
    /**
     * 
     * @param {Number} width 
     * @param {Number} height 
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.world = new World(this, Map);
        this.player = new Player(this, 6, 6);
        this.inputHandler = new InputHandler(this);
        this.mapEditor = new MapEditor(this.world);

        this.entities = this.loadEntities(Entities);
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
        let data = [];

        entities.forEach(entity => {
            const classConstructor = classMapping[entity.class];

            data.push(new classConstructor(this, entity.worldX, entity.worldY));
        });
 
        return data;
    }
}