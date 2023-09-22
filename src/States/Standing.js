import State from "./State.js";
import { PLAYER_STATES } from "../consts.js";
import Player from "../Entities/Player.js";
import Moving from "./Moving.js";

export default class Standing extends State {
    /**
     * 
     * @param {Player} player 
     */
    constructor(player) {
        super(PLAYER_STATES.STANDING);

        this.player = player;
    }

    /**
     * 
     * @param {Array} input 
     */
    handleInput(input) {
        if (input.includes('ArrowLeft') || input.includes('ArrowRight') || input.includes('ArrowDown') || input.includes('ArrowUp')) {
            this.player.setState(new Moving(this.player));
        }
    }
}