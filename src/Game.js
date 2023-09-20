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

        this.players = {};
        this.players = this.loadPlayers(players);
        this.entities = this.loadEntities(Entities);

        this.player = new CurrentPlayer(this, playerData.name, playerData.worldX, playerData.worldY);

        this.inputHandler = new InputHandler(this);
        this.mapEditor = new MapEditor(this.world);
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

            data.push(new classConstructor(this, 'Some', entity.worldX, entity.worldY));
        });

        return data;
    }

    loadPlayers(players) {
        let data = {};

        for (const nickname in players) {
            if (players.hasOwnProperty(nickname)) {
                const value = players[nickname];
                
                data[nickname] = new Player(this, nickname, value.worldX, value.worldY);
                data[nickname].animation.frameX = value.frameX;
                data[nickname].direction = value.direction;
                data[nickname].setStateWithId(value.currentState);
                data[nickname].setSpeedByDirection(value.direction);
            }
        }

        return data;
    }

    updatePlayers(newPlayers) {
        delete newPlayers[this.player.name];
        this.players = this.loadPlayers(newPlayers)
    }

    moveAllEntitiesX(offset) {
        this.entities.forEach(entity => {
            entity.x = entity.x + offset;
        })
    }

    moveAllEntitiesY(offset) {
        this.entities.forEach(entity => {
            entity.y = entity.y + offset;
        })
    }

    moveAllPlayersX(offset) {
        for (const key in this.players) {
            if (this.players.hasOwnProperty(key)) {
                this.players[key].x += offset;
            }
        }
    }

    moveAllPlayersY(offset) {
        for (const key in this.players) {
            if (this.players.hasOwnProperty(key)) {
                this.players[key].y += offset;
            }
        }
    }
}
