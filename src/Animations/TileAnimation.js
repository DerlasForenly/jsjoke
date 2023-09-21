
import Animation from "./Animation.js";
import Tile from "../Entities/Tile.js";
import Layer from "./Layer.js";
import { TileConfigs } from "../DTO/TileConfigs.js";

export default class TileAnimation extends Animation {
    /**
     * @param {Tile} entity
     * @param {Layer[]} layers
     */
    constructor(entity, layers = []) {
        super(entity);

        this.reverceAnimation = false;

        this.layers = [];

        layers.forEach(layer => {
            if (TileConfigs.hasOwnProperty(layer)) {
                this.layers.push(new Layer(this, layer))
            } else {
                console.error('There is no tile sprite: ' + layer);
            }
            
        })
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].draw(context);
        }
    }

    setLayer(layerNumber, spriteId) {
        if (layerNumber >= this.layers.length) {
            console.error('Out of layers');
            return;
        }

        delete this.layers[layerNumber];
        
        this.layers[layerNumber] = new Layer(this, spriteId);
    }

    getLayerIds() {
        let ids = [];
        
        this.layers.forEach(layer => {
            ids.push(layer.spriteId);
        })

        return ids;
    }
}