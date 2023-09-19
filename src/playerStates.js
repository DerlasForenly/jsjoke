import { PLAYER_STATES } from "./consts.js";

class State {
    constructor(state) {
        this.state = state;
    }

    enter() {
    }
}

export class Moving extends State {
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

export class Standing extends State {
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