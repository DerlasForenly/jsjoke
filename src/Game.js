import Player from "./Entities/Player.js";
import InputHandler from "../src/InputHandler.js";
import World from "./World.js";
import MapEditor from "./MapEditor.js";

import { classMapping } from "./Entities.js";
import CurrentPlayer from "./Entities/CurrentPlayer.js";

export default class Game {
    /**
     *
     * @param {Number} width
     * @param {Number} height
     */
    constructor(width, height, map, playerData, players, mobs, socket) {
        this.socket = socket;

        this.width = width;
        this.height = height;

        this.world = new World(this, map);

        this.players = this.loadPlayers(players);
        this.mobs = this.loadEntities(mobs);
        this.player = new CurrentPlayer(this, playerData.name, playerData.worldX, playerData.worldY);

        this.mapEditor = new MapEditor(this.world);
        this.inputHandler = new InputHandler(this);
    }

    /**
     * Draw all game elements
     *
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {
        this.world.draw(context);

        for (const key in this.mobs) {
            if (this.mobs.hasOwnProperty(key)) {
                this.mobs[key].draw(context);
            }
        }
        for (const key in this.players) {
            if (this.players.hasOwnProperty(key)) {
                this.players[key].draw(context);
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
        this.player.update(this.inputHandler, deltaTime);

        for (const key in this.mobs) {
            if (this.mobs.hasOwnProperty(key)) {
                this.mobs[key].update(deltaTime);
            }
        }
        for (const key in this.players) {
            if (this.players.hasOwnProperty(key)) {
                this.players[key].update(deltaTime);
            }
        }
    }

    loadEntities(entities) {
        let data = {};

        for (const name in entities) {
            if (this.mobs.hasOwnProperty(name) && !entities.hasOwnProperty(name)) {
                delete this.mobs[name];
            }

            const classConstructor = classMapping[name.split('_')[0]];
            const value = entities[name];

            let mob = null;
            if (this.mobs.hasOwnProperty(name)) {
                mob = this.mobs[name];
                mob.x = this.world.referenceTile.x + value.worldX;
                mob.y = this.world.referenceTile.y + value.worldY;
                mob.hp = value.hp;
            } else {
                mob = new classConstructor(this, {...value, name});
            }
            
            data[name] = mob;
            data[name].direction = value.direction;
        }

        return data;
    }

    loadPlayers(players) {
        let data = {};

        for (const nickname in players) {
            if (players.hasOwnProperty(nickname)) {
                const value = players[nickname];

                let player = null;
                if (this.players.hasOwnProperty(nickname)) {
                    player = this.players[nickname];
                    player.x = this.world.referenceTile.x + value.worldX;
                    player.y = this.world.referenceTile.y + value.worldY;
                } else {
                    player = new Player(this, nickname, value.worldX, value.worldY);
                }
                
                data[nickname] = player;
                data[nickname].direction = value.direction;
                data[nickname].setStateWithId(value.currentState);
                data[nickname].setSpeedByDirection(value.direction, value.speed);
            }
        }

        return data;
    }

    updatePlayers(newPlayers) {
        delete newPlayers[this.player.name];
        this.players = this.loadPlayers(newPlayers);
    }

    updateEntities(newEntities) {
        this.mobs = this.loadEntities(newEntities);
    }

    moveAllEntitiesX(offset) {
        for (const key in this.mobs) {
            if (this.mobs.hasOwnProperty(key)) {
                this.mobs[key].x += offset;
            }
        }

        for (const key in this.players) {
            if (this.players.hasOwnProperty(key)) {
                this.players[key].x += offset;
            }
        }
    }

    moveAllEntitiesY(offset) {
        for (const key in this.mobs) {
            if (this.mobs.hasOwnProperty(key)) {
                this.mobs[key].y += offset;
            }
        }

        for (const key in this.players) {
            if (this.players.hasOwnProperty(key)) {
                this.players[key].y += offset;
            }
        }
    }
}
