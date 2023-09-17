import Game from "./src/Game.js";
import { Map } from "./src/Map.js";

const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', (event) => {
    console.log('Connected to the server');
});

socket.addEventListener('message', (event) => {
    console.log(event.data);
});

socket.addEventListener('close', (event) => {
    if (event.wasClean) {
        console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
    } else {
        console.error('Connection died');
    }
});

function sendMessage() {
    socket.send('Hello');
}

const players = {
    "player0": {
        "worldXPixel": 423,
        "worldYPixel": 56,
    },
    "player1": {
        "worldXPixel": 423+48,
        "worldYPixel": 56+58,
    },
    "player2": {
        "worldXPixel": 423+48,
        "worldYPixel": 56+98,
    },
};

const playerData = {
    "worldX": 6*48,
    "worldY": 6*48,
};

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.height = 624;
    canvas.width = 624;

    const game = new Game(canvas.width, canvas.height, Map, playerData, players);
    let lastTime = 0;

    function animate(timeStamt = 0) {
        const deltaTime = timeStamt - lastTime;
        lastTime = timeStamt;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate();
});

