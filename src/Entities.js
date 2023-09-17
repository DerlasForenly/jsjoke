import Slime from "./Slime.js";
import Rock from "./Rock.js";

export const Entities = [
    {
        "class": "Slime",
        "worldX": 2,
        "worldY": 2,
    },
    {
        "class": "Slime",
        "worldX": 4,
        "worldY": 5,
    },
]

export const classMapping = {
    "Slime": Slime,
    "Rock": Rock,
};