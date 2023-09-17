import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '@app/../../shared/models/task/task.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, catchError, takeUntil } from 'rxjs';
import { PlayerService } from 'src/app/core/services/player.service';
import { TaskService } from 'src/app/core/services/task.service';
import { Difficulty } from 'src/app/shared/models/difficulty.enum';
import { Status } from 'src/app/shared/models/status.enum';
import { ButtonColors } from 'src/app/shared/types/button-colors.type';
import { Player } from '../../../../../shared/models/player/player.interface';
import { LevelService } from 'src/app/core/services/level.service';
import { Level } from '../../../../../shared/models/level/level.interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  public isLoading = true;
  public unlockedTasks!: Task[];
  public lockedTasks!: Task[];
  public skeletonTasks = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
  public clonedTasks: { [s: string]: Task } = {};
  public difficultyEnumValues: Difficulty[] = Object.values(Difficulty);
  public statusEnumValues: Status[] = [Status.Ready, Status.InProgress];
  public doneStatus: Status = Status.Done;
  public addTaskDialogVisible = false;
  public activePlayer: Player | null = null;
  public currentLevel: Level | null = null;
  public taskForm!: FormGroup;
  public selectedTasks: Task[] = [];
  public minDate: Date = new Date();
  public selectedDate: Date = new Date();
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private _taskService: TaskService,
    private _playerService: PlayerService,
    private _levelService: LevelService,
    private _messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder) {
      this._playerService.activePlayer$.pipe(takeUntil(this.destroy$)).subscribe((player) => {
        this.activePlayer = player;
        this.fetchTasks();
      });
  
      this._levelService.activeLevel$.pipe(takeUntil(this.destroy$)).subscribe((level) => {
        this.currentLevel = level;
      });
  }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      points: ['', [Validators.required, Validators.min(0)]],
      difficulty: [Difficulty.Easy, [Validators.required]],
      description: [''],
    });
  }

  private fetchTasks(): void {
    this._taskService.fetchTasks().subscribe(data => {
      this.unlockedTasks = data.map(task => ({
        ...task,
        date: new Date(task.date).toISOString(),
      }));
      this.unlockedTasks = data.filter(t => t.level === this.activePlayer?.level.num);
      this.lockedTasks = this.unlockedTasks.filter(t => t.status === Status.Done);
      this.isLoading = false;
    });
  }

  public addTask(): void {
    this.addTaskDialogVisible = true;
  }

  public onAddTaskSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    const newTask = this.taskForm.value as Task;
    newTask.id = "task" + (Math.random() * 100).toFixed(0).toString();
    newTask.level = this.activePlayer?.level.num ?? 0;
    newTask.status = Status.Ready;

    this._taskService.addTask(newTask).pipe(catchError(err => {
      this._messageService.add({ severity: 'error', summary: 'Update task', detail: 'An error occurred while saving the task' });
      return err;
    })).subscribe(res => {
      this.unlockedTasks.push(res as Task);
      this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Task is created' });
    });
    this.taskForm.reset();
    this.addTaskDialogVisible = false;
  }

  public onAddTaskCancel(): void {
    this.taskForm.reset();
    this.addTaskDialogVisible = false;
  }

  public isFieldInvalid(fieldName: string): boolean {
    const control = this.taskForm.get(fieldName);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }

  public onRowEditInit(task: Task): void {
    this.clonedTasks[task.id as string] = { ...task };
    this.selectedDate = new Date(task.date);
  }

  public onRowEditSave(task: Task): void {
    if (task.points < 0) {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Points' });
      return;
    }
    if (task.title === '') {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Title' });
      return;
    }

    this._taskService.editTask(task.id, task).pipe(catchError(err => {
      this._messageService.add({ severity: 'error', summary: 'Update task', detail: 'An error occurred while updating the task' });
      return err;
    })).subscribe(res => {
      delete this.clonedTasks[task.id as string];
      this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Task is updated' });
    });
  }

  public onRowEditCancel(task: Task, index: number): void {
    this.unlockedTasks[index] = this.clonedTasks[task.id as string];
    delete this.clonedTasks[task.id as string];
  }

  public onRowDelete(event: Event, task: Task, index: number): void {
    if (task.status === Status.Done) {
      this._messageService.add({ severity: 'error', summary: 'Delete task', detail: 'This task already done' });
      return;
    }
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._taskService.deleteTask(task.id).pipe(catchError(err => {
          this._messageService.add({ severity: 'error', summary: 'Delete task', detail: 'An error occurred while deleting the task' });
          return err;
        })).subscribe(res => {
          delete this.unlockedTasks[index];
          this._messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Task is deleted' });
        });
      }
    });
  }

  public onCompleteTasks(playerId: string | undefined, tasks: Task[]): void {
    if (!playerId) {
      this._messageService.add({ severity: 'error', summary: 'Complete task', detail: 'Player not found' });
      return;
    }

    const tasksId = tasks.map(task => task.id);

    this.unlockedTasks = this.unlockedTasks.map(task => ({
      ...task,
      status: tasksId.includes(task.id) ? Status.Done : task.status,
    }));

    this.selectedTasks = [];
    this._playerService.completeTasks(playerId, tasksId).pipe(catchError(err => {
      this._messageService.add({ severity: 'error', summary: 'Complete task', detail: 'An error occurred while completing the task' });
      return err;
    })).subscribe(player => {
      this.activePlayer = player as Player;
      this._messageService.add({ severity: 'success', summary: 'Complete task', detail: 'Great! you have completed ' + tasksId.length + " tasks!" });

      this._playerService.loadActivePlayer();
      this._levelService.loadCurrentLevel(this.activePlayer.level.num);
      if (this.currentLevel?.num !== this.activePlayer.level.num) {
        this._messageService.add({ severity: 'success', summary: 'Level up!', detail: 'Great job! You have reached level ' + this.currentLevel?.num + "!" });
        this.currentLevel = this.activePlayer.level;
        this.fetchTasks();
      }
    });
  }

  public handleHeaderCheckboxToggle(event: any) {
    this.selectedTasks = [];

    if (event.checked) {
      this.selectedTasks = this.unlockedTasks.filter(task => task.status !== Status.Done);
    }
  }

  public getStatusColor(status: Status): ButtonColors {
    switch (status) {
      case Status.Done:
        return 'success';
      case Status.InProgress:
        return 'warning';
      case Status.Ready:
        return 'danger';
    }
  }

  public getDifficultyColor(difficulty: Difficulty): ButtonColors {
    switch (difficulty) {
      case Difficulty.VeryEasy:
        return 'success';
      case Difficulty.Easy:
        return 'success';
      case Difficulty.Medium:
        return 'warning';
      case Difficulty.Hard:
        return 'danger';
      case Difficulty.SuperHard:
        return 'danger';
    }
  }
}
