import { Difficulty as DifficultyLevel } from "./difficulty.enum";
import { Status as TaskStatus } from "./status.enum";

export interface Task {
    title: string;
    date: string;
    points: number;
    difficulty: DifficultyLevel;
    status: TaskStatus;
}