import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '@app/../../shared/models/task/task.interface';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Post()
  addTask(@Body() task: Task) {
    return this.tasksService.addTask(task);
  }

  @Put(':id')
  editTask(@Param('id') id: string, @Body() task: Task) {
    return this.tasksService.editTask(id, task);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
