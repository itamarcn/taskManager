import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Task } from '@app/../../shared/models/task/task.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private _http: HttpClient) {}

  public fetchTasks(): Observable<Task[]> {
      return this._http.get<Task[]>(`${environment.apiUrl}/tasks`);
  }

  public addTask(task: Task): Observable<Task> {
    return this._http.post<Task>(`${environment.apiUrl}/tasks`, task);
  }

  public editTask(taskId: string, task: Task): Observable<Task> {
    return this._http.put<Task>(`${environment.apiUrl}/tasks/${taskId}`, task);
  }

  public deleteTask(taskId: string): Observable<void> {
    return this._http.delete<void>(`${environment.apiUrl}/tasks/${taskId}`);
  }
}