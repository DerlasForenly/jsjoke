import State from "./State.js";
import { PLAYER_STATES } from "../consts.js";
import Standing from "./Standing.js";

export default class Moving extends State {
    constructor(player) {
        super(PLAYER_STATES.MOVING);

        this.player = player;
    }

    /**
     * 
     * @param {Array} input 
     */
    handleInput(input) {
        if (!input.includes('ArrowLeft') && !input.includes('ArrowRight') && !input.includes('ArrowDown') && !input.includes('ArrowUp')) {
            this.player.setState(new Standing(this.player));
        }
    }
}