import Player from "./Entities/Player.js";
import InputHandler from "../src/InputHandler.js";
import World from "./World.js";
import MapEditor from "./MapEditor.js";

import { Entities, classMapping } from "./Entities.js";
import CurrentPlayer from "./Entities/CurrentPlayer.js";

export default class Game {
    /**
     * 
     * @param {Number} width 
     * @param {Number} height 
     */
    constructor(width, height, map, playerData, players) {
        this.width = width;
        this.height = height;

        this.world = new World(this, map);
        this.player = new CurrentPlayer(this, playerData.worldX, playerData.worldY, "Hrysha");
        
        this.inputHandler = new InputHandler(this);
        this.mapEditor = new MapEditor(this.world);

        this.players = this.loadPlayers(players);
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
        for (const key in this.players) {
            if (this.players.hasOwnProperty(key)) {
                const value = this.players[key];
                value.draw(context);
            }
        }
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
        for (const key in this.players) {
            if (this.players.hasOwnProperty(key)) {
                const value = this.players[key];
                value.update(deltaTime);
            }
        }
    }

    loadEntities(entities) {
        let data = [];

        entities.forEach(entity => {
            const classConstructor = classMapping[entity.class];

            data.push(new classConstructor(this, entity.worldX, entity.worldY));
        });
 
        return data;
    }

    loadPlayers(players) {
        let data = {};

        for (const key in players) {
            if (players.hasOwnProperty(key)) {
                const value = players[key];
                data[key] = new Player(this, value.worldX, value.worldY, key);
            }
        }
 
        return data;
    }
}