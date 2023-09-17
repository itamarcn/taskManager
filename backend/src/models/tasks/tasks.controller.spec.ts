import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from '@app/../../shared/models/task/task.interface';
import { NotFoundException } from '@nestjs/common';
import { Difficulty } from '../../../../shared/models/task/difficulty.enum';
import { Status } from '../../../../shared/models/task/status.enum';

describe('TasksController', () => {
    let controller: TasksController;
    let service: TasksService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TasksController],
            providers: [TasksService],
        }).compile();

        controller = module.get<TasksController>(TasksController);
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
                // ... (other tasks)
            ];
            jest.spyOn(service, 'getAllTasks').mockReturnValue(tasks);

            expect(controller.getAllTasks()).toEqual(tasks);
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

            expect(controller.addTask(newTask)).toEqual(newTask);
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

            expect(controller.editTask(taskId, updatedTask)).toEqual(updatedTask);
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

            expect(() => controller.editTask(taskId, updatedTask)).toThrowError(NotFoundException);
        });
    });

    describe('deleteTask', () => {
        it('should delete an existing task', () => {
            const taskId = 'task1';

            const deleteSpy = jest.spyOn(service, 'deleteTask');
            controller.deleteTask(taskId);

            expect(deleteSpy).toHaveBeenCalledWith(taskId);
        });

        it('should throw NotFoundException when the task is not found', () => {
            const taskId = 'task21';

            jest.spyOn(service, 'deleteTask').mockImplementation(() => {
                throw new NotFoundException('Task not found');
            });

            expect(() => controller.deleteTask(taskId)).toThrowError(NotFoundException);
        });
    });

});
