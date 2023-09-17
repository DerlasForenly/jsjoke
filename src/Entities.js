import Slime from "./Slime.js";
import Rock from "./Rock.js";

export const Entities = [
    {
        "class": "Slime",
        "worldX": Math.floor(Math.random() * 10),
        "worldY": Math.floor(Math.random() * 10),
    },
    {
        "class": "Slime",
        "worldX": Math.floor(Math.random() * 10),
        "worldY": Math.floor(Math.random() * 10),
    },
    {
        "class": "Slime",
        "worldX": Math.floor(Math.random() * 10),
        "worldY": Math.floor(Math.random() * 10),
    },
    {
        "class": "Slime",
        "worldX": Math.floor(Math.random() * 10),
        "worldY": Math.floor(Math.random() * 10),
    },
    {
        "class": "Slime",
        "worldX": Math.floor(Math.random() * 10),
        "worldY": Math.floor(Math.random() * 10),
    },
    {
        "class": "Slime",
        "worldX": Math.floor(Math.random() * 10),
        "worldY": Math.floor(Math.random() * 10),
    },
]

export const classMapping = {
    "Slime": Slime,
    "Rock": Rock,
};