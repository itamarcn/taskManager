import { Component, OnDestroy } from '@angular/core';
import { Player } from '../../../../../shared/models/player/player.interface';
import { PlayerService } from 'src/app/core/services/player.service';
import { LevelService } from 'src/app/core/services/level.service';
import { Level } from '../../../../../shared/models/level/level.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public activePlayer: Player | null = null;
  public currentLevel: Level | null = null;
  public dailyTip: string = 'Start your day by creating a to-do list of all the tasks you need to complete. This list should include both work-related and personal tasks';
  public photo_url = '../../../assets/images/';

  constructor(private _playerService: PlayerService,
    private _levelService: LevelService) {
    this._playerService.activePlayer$.pipe(takeUntil(this.destroy$)).subscribe((player) => {
      this.activePlayer = player;
      this._levelService.loadCurrentLevel(this.activePlayer?.level.num ?? 1);
    });

    this._levelService.activeLevel$.pipe(takeUntil(this.destroy$)).subscribe((level) => {
      this.currentLevel = level;
      this.photo_url = `../../../assets/images/avatar-${this.currentLevel?.num}.png`;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
