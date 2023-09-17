import { Level } from "../level/level.interface";

export interface Player {
    id: string;
    name: string;
    points: number;
    level: Level;
}