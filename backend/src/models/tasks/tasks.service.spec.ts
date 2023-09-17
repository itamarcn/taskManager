import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task } from '@app/../../shared/models/task/task.interface';
import { NotFoundException } from '@nestjs/common';
import { Difficulty } from '../../../../shared/models/task/difficulty.enum';
import { Status } from '../../../../shared/models/task/status.enum';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  describe('getAllTasks', () => {
    it('should return an array of tasks', () => {
      const tasks: Task[] = [
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

      jest.spyOn(service, 'getAllTasks').mockReturnValue(tasks);

      expect(service.getAllTasks()).toEqual(tasks);
    });
  });

  describe('addTask', () => {
    it('should add a new task', () => {
      const newTask: Task = {
        id: 'task21',
        title: 'New Task',
        description: 'Description for the new task.',
        date: new Date(2023, 9, 26).toISOString(),
        difficulty: Difficulty.Medium,
        points: 4,
        status: Status.Ready,
        level: 2,
      };

      jest.spyOn(service, 'addTask').mockReturnValue(newTask);

      expect(service.addTask(newTask)).toEqual(newTask);
    });
  });

  describe('getTask', () => {
    it('should return a task by ID', () => {
      const taskId = 'task1';
      const task: Task = {
        id: 'task1',
        title: 'Water the Plants',
        description: 'Water the plants in the garden.',
        date: new Date(2023, 9, 25).toISOString(),
        difficulty: Difficulty.Easy,
        points: 2,
        status: Status.Ready,
        level: 1,
      };

      jest.spyOn(service, 'getTask').mockReturnValue(task);

      expect(service.getTask(taskId)).toEqual(task);
    });

    it('should return undefined if the task is not found', () => {
      const taskId = 'task21'; // Task with ID 'task21' doesn't exist

      jest.spyOn(service, 'getTask').mockReturnValue(undefined);

      expect(service.getTask(taskId)).toBeUndefined();
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', () => {
      const updatedTask: Task = {
        id: 'task1',
        title: 'Updated Task',
        description: 'Updated description for the task.',
        date: new Date(2023, 9, 27).toISOString(),
        difficulty: Difficulty.Hard,
        points: 5,
        status: Status.Done,
        level: 3,
      };

      jest.spyOn(service, 'updateTask').mockReturnValue(updatedTask);

      expect(service.updateTask(updatedTask)).toEqual(updatedTask);
    });
  });

  describe('editTask', () => {
    it('should edit an existing task', () => {
      const taskId = 'task1';
      const updatedTask: Task = {
        id: 'task1',
        title: 'Updated Task',
        description: 'Updated description for the task.',
        date: new Date(2023, 9, 27).toISOString(),
        difficulty: Difficulty.Hard,
        points: 5,
        status: Status.Done,
        level: 3,
      };

      jest.spyOn(service, 'editTask').mockReturnValue(updatedTask);

      expect(service.editTask(taskId, updatedTask)).toEqual(updatedTask);
    });

    it('should throw NotFoundException when the task is not found', () => {
      const taskId = 'task21'; // Task with ID 'task21' doesn't exist
      const updatedTask: Task = {
        id: 'task21',
        title: 'Updated Task',
        description: 'Updated description for the task.',
        date: new Date(2023, 9, 27).toISOString(),
        difficulty: Difficulty.Hard,
        points: 5,
        status: Status.Done,
        level: 3,
      };

      jest.spyOn(service, 'editTask').mockImplementation(() => {
        throw new NotFoundException('Task not found');
      });

      expect(() => service.editTask(taskId, updatedTask)).toThrowError(NotFoundException);
    });
  });

  describe('deleteTask', () => {
    it('should delete an existing task', () => {
      const taskId = 'task1';

      jest.spyOn(service, 'deleteTask').mockReturnValue(undefined);

      expect(service.deleteTask(taskId)).toBeUndefined();
    });

    it('should throw NotFoundException when the task is not found', () => {
      const taskId = 'task21'; // Task with ID 'task21' doesn't exist

      jest.spyOn(service, 'deleteTask').mockImplementation(() => {
        throw new NotFoundException('Task not found');
      });

      expect(() => service.deleteTask(taskId)).toThrowError(NotFoundException);
    });
  });
});
