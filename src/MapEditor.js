import Tile from "./Tile.js";

export default class MapEditor {
    constructor(world) {
        this.world = world;
        this.isActive = true;

        this.activeTile = 'rockTile';
        const exportButton = document.getElementById('exportMap');
        const importInput = document.getElementById('import');

        exportButton.onclick = e => {
            this.exportMap();
        }

        importInput.onchange = e => {
            let fileInput = importInput;
            let data = null;
            let file = fileInput.files[0]; 
            let reader = new FileReader();
            
            reader.onload = function(event) {
                let fileContent = event.target.result;
                
                data = JSON.parse(fileContent);

                data.forEach(item => {
                    world.tiles[item.worldX][item.worldY] = new Tile(world.game, item.worldX, item.worldY, item.spriteId);
                });
            };

            reader.readAsText(file);
        }

        document.getElementById('rockButton').onclick = e => {
            console.log('Activated rock tile');
            this.activeTile = 'rockTile';
        }

        document.getElementById('landButton').onclick = e => {
            console.log('Activated land tile');
            this.activeTile = 'land';
        }
    }

    exportMap() {
        let data = [];

        this.world.tiles.forEach(row => {
            row.forEach(tile => {
                /**
                * @var {Tile} tile
                */
                data.push({
                    worldX: tile.worldX,
                    worldY: tile.worldY,
                    spriteId: tile.spriteId,
                    isImpassable: tile.isImpassable
                })
            });
        });

        var jsonString = JSON.stringify(data);
        var blob = new Blob([jsonString], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'map.json';
        a.textContent = 'Download map.json';

        document.body.appendChild(a);
    }
}