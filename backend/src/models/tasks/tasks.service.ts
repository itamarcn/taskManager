import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@app/../../shared/models/task/task.interface';
import { Difficulty } from '../../../../shared/models/task/difficulty.enum';
import { Status } from '../../../../shared/models/task/status.enum';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 'task1',
      title: 'Water the Plants',
      description: 'Water the plants in the garden.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Easy,
      points: 2,
      status: Status.Ready,
      level: 1,
    },
    {
      id: 'task2',
      title: 'Write a Report',
      description: 'Write a report for the upcoming project.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Medium,
      points: 3,
      status: Status.Ready,
      level: 1,
    },
    {
      id: 'task3',
      title: 'Gym Workout',
      description: 'Hit the gym for a workout session.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Medium,
      points: 3,
      status: Status.Ready,
      level: 1,
    },
    {
      id: 'task4',
      title: 'Cook Dinner',
      description: 'Prepare a delicious dinner for the family.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Easy,
      points: 2,
      status: Status.Ready,
      level: 1,
    },
    {
      id: 'task5',
      title: 'Study for Exam',
      description: 'Study for the upcoming math exam.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Hard,
      points: 1,
      status: Status.Ready,
      level: 1,
    },
    {
      id: 'task6',
      title: 'Read a Book',
      description: 'Read a new novel for leisure.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Medium,
      points: 2,
      status: Status.Ready,
      level: 1,
    },
    {
      id: 'task7',
      title: 'Project Meeting',
      description: 'Attend the weekly project meeting.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Easy,
      points: 3,
      status: Status.Ready,
      level: 1,
    },
    {
      id: 'task8',
      title: 'Write Code',
      description: 'Work on coding tasks for the software project.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Medium,
      points: 4,
      status: Status.Ready,
      level: 1,
    },
    {
      id: 'task9',
      title: 'Yoga Session',
      description: 'Participate in a relaxing yoga session.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Easy,
      points: 3,
      status: Status.Ready,
      level: 2,
    },
    {
      id: 'task10',
      title: 'Plan Vacation',
      description: 'Plan a family vacation for the holidays.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Medium,
      points: 5,
      status: Status.Ready,
      level: 2,
    },
    {
      id: 'task11',
      title: 'Write Blog Post',
      description: 'Write a blog post on a trending topic.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Medium,
      points: 6,
      status: Status.Ready,
      level: 2,
    },
    {
      id: 'task12',
      title: 'Paint the Living Room',
      description: 'Paint the living room with a fresh coat of paint.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Hard,
      points: 6,
      status: Status.Ready,
      level: 2,
    },
    {
      id: 'task13',
      title: 'Learn a New Language',
      description: 'Start learning a new language online.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Medium,
      points: 8,
      status: Status.Ready,
      level: 3,
    },
    {
      id: 'task14',
      title: 'Bike Ride',
      description: 'Go for a long bike ride in the park.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Easy,
      points: 6,
      status: Status.Ready,
      level: 3,
    },
    {
      id: 'task15',
      title: 'Cook a New Recipe',
      description: 'Try cooking a new and challenging recipe.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Medium,
      points: 8,
      status: Status.Ready,
      level: 3,
    },
    {
      id: 'task16',
      title: 'Clean the Garage',
      description: 'Organize and clean the cluttered garage.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Hard,
      points: 9,
      status: Status.Ready,
      level: 3,
    },
    {
      id: 'task17',
      title: 'Practice Guitar',
      description: 'Practice playing the guitar for an hour.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Medium,
      points: 5,
      status: Status.Ready,
      level: 3,
    },
    {
      id: 'task18',
      title: 'Volunteer at Animal Shelter',
      description: 'Spend a few hours volunteering at the local animal shelter.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Easy,
      points: 4,
      status: Status.Ready,
      level: 3,
    },
    {
      id: 'task19',
      title: 'Family Movie Night',
      description: 'Organize a family movie night with popcorn and snacks.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Easy,
      points: 9,
      status: Status.Ready,
      level: 4,
    },
    {
      id: 'task20',
      title: 'Read Scientific Journal',
      description: 'Read a scientific journal article related to your field of study.',
      date: new Date(2023, 9, 25).toISOString(),
      difficulty: Difficulty.Hard,
      points: 11,
      status: Status.Ready,
      level: 4,
    },
  ];  

  getAllTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): Task {
    this.tasks.push(task);
    return task;
  }

  getTask(taskId: string): Task {
    return this.tasks.find(task => task.id === taskId);
  }

  updateTask(task: Task): Task {
    const _taskIndex = this.tasks.findIndex(task => task.id === task.id);
    this.tasks[_taskIndex] = task;
    return this.tasks[_taskIndex];
  }

  editTask(id: string, updatedTask: Task): Task {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }
    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
    return this.tasks[taskIndex];
  }

  deleteTask(id: string): Task {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }
    const deletedTask = this.tasks.splice(taskIndex, 1);
    return deletedTask[0];
  }
}
