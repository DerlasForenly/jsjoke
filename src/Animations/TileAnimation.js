
import Animation from "./Animation.js";
import Tile from "../Entities/Tile.js";
import Layer from "./Layer.js";

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
            this.layers.push(new Layer(this, layer))
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

    
}