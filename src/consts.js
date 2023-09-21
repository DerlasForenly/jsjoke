const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const ENTER = 'Enter';

export const KEYS = [
    ARROW_UP,
    ARROW_DOWN,
    ARROW_LEFT,
    ARROW_RIGHT,
    ENTER,
];

export const DIRECTIONS = {
    N: 0,
    S: 1,
    E: 2,
    W: 3,
    NE: 4,
    NW: 5,
    SW: 6, 
    SE: 7,
}

export const PLAYER_STATES = {
    MOVING: 0,
    CURSED_MOVING: 1,
    STANDING: 2,
}
