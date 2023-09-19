import Game from "./src/Game.js";

window.addEventListener('load', async function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.height = 624;
    canvas.width = 624;

    const SERVER_URL = await fetch(`${window.location.origin}/api/server-url`)
    .then((res) => res.json())
    .then((data) => data.SERVER_URL);

    const map = await fetch(`${window.location.origin}/api/map`)
    .then((res) => res.json())
    .then((data) => data.map);

    const socket = io(SERVER_URL);

    const playerName = Math.random().toString(16).slice(2, 8);
    let { player, players, world } = await socket.emitWithAck('init', {
        playerName,
    });

    console.log('player', playerName);
    delete players[playerName];

    socket.on('disconnect', () => { // Update page on disconnect
        window.location.href = window.location.href + '/';
    });

    const game = new Game(canvas.width, canvas.height, map, player, players);
    let lastTime = 0;

    socket.on('tick', (newPlayers) => {
        game.updatePlayers(newPlayers);
    });

    function animate(timeStamt = 0) {
        const deltaTime = timeStamt - lastTime;
        lastTime = timeStamt;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    setInterval(() => {
        socket.emit('client-tick', {
            worldX: game.player.getWorldXPixel(),
            worldY: game.player.getWorldYPixel(),
            direction: game.player.direction,
        });
    }, 1000 / 30);

    animate();
});
