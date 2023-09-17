import Game from "./src/Game.js";

const socket = new WebSocket('ws://localhost:8080');

const canvasSizes = {
    width: 624,
    height: 624,
}

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

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.height = 624;
    canvas.width = 624;

    const game = new Game(canvas.width, canvas.height);
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

