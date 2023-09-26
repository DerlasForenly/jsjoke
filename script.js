import Game from "./src/Game.js";

window.onload = () => {
    const queryString = window.location.search;
    if (queryString.includes('dev')) {
        const playerName = Math.random().toString(16).slice(2, 10);
        document.getElementById('login').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        initGame(playerName);
    } else {
        const loginButton = document.getElementById('login-button');
        loginButton.addEventListener('click', async () => {
            const playerName = document.getElementById('player-name').value;
            if (playerName && playerName.length > 0 && playerName.length < 10 && playerName.match(/^[a-zA-Z0-9]+$/)) {
                document.getElementById('login').style.display = 'none';
                document.getElementById('game').style.display = 'block';
                initGame(playerName);
            }
        });
    }
}

const initGame = async (playerName) => {
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


    let { player, players, mobs } = await socket.emitWithAck('init', {
        playerName,
    });

    console.log('player', playerName);
    delete players[playerName];

    socket.on('disconnect', () => { // Update page on disconnect
        window.location.href = window.location.href;
    });

    const game = new Game(canvas.width, canvas.height, map, player, players, mobs, socket);
    let lastTime = 0;

    socket.on('tick', (gameData) => {
        game.updatePlayers(gameData.players);
        game.updateEntities(gameData.mobs);
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
            currentState: game.player.currentState.state,
            speed: game.player.getSpeed(),
        });
    }, 3);



    animate();
}
