import State from "./State.js";
import { PLAYER_STATES } from "../consts.js";

export default class Casting extends State {
    constructor(player) {
        super(PLAYER_STATES.CASTING);

        this.player = player;
    }

    enter() {

    }

    /**
     * 
     * @param {Array} input 
     */
    handleInput(input) {
        
    }
}