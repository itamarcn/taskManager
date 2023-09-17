import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from '@app/../../shared/models/player/player.interface';

@Injectable({
    providedIn: 'root',
})
export class PlayerService {
    private activePlayerSubject = new BehaviorSubject<Player | null>(null);
    activePlayer$: Observable<Player | null> = this.activePlayerSubject.asObservable();

    constructor(private _http: HttpClient) {
        this.loadActivePlayer();
    }

    public loadActivePlayer(): void {
        this.getActivePlayer().subscribe({
            next: (player) => {
                this.activePlayerSubject.next(player);
            },
            error: (error) => {
                console.error('Error loading active player', error);
            }
        });
    }

    public getAllPlayers(): Observable<Player[]> {
        return this._http.get<Player[]>(`${environment.apiUrl}/players`);
    }

    public getActivePlayer(): Observable<Player> {
        return this._http.get<Player>(`${environment.apiUrl}/players/active`);
    }

    public completeTasks(playerId: string, tasksId: string[]): Observable<Player> {
        return this._http.post<Player>(
            `${environment.apiUrl}/players/complete-tasks/${playerId}`,
            { tasksId }
        );
    }
}
