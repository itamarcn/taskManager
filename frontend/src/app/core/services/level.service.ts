import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Level } from '@app/../../shared/models/level/level.interface';

@Injectable({
    providedIn: 'root',
})
export class LevelService {
    private activeLevelSubject = new BehaviorSubject<Level | null>(null);
    activeLevel$: Observable<Level | null> = this.activeLevelSubject.asObservable();

    constructor(private _http: HttpClient) {
        this.loadCurrentLevel(1);
    }

    public loadCurrentLevel(level: number): void {
        this.getCurrentLevel(level).subscribe({
            next: (level) => {
                this.activeLevelSubject.next(level);
            },
            error: (error) => {
                console.error('Error loading current level', error);
            }
        });
    }

    public getCurrentLevel(levelNumber: number): Observable<Level> {
        return this._http.get<Level>(`${environment.apiUrl}/levels/${levelNumber}`);
    }
}
