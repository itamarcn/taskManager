import { Difficulty as DifficultyLevel } from "./difficulty.enum";
import { Status as TaskStatus } from "./status.enum";

export interface Task {
    id: string;
    title: string;
    date: string;
    points: number;
    difficulty: DifficultyLevel;
    description: string;
    status: TaskStatus;
    level: number;
}