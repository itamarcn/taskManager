import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from '@app/../../shared/models/player/player.interface';
import { TasksService } from '../tasks/tasks.service';
import { LevelsService } from '../levels/levels.service';
import { Status } from '../../../../shared/models/task/status.enum';

@Injectable()
export class PlayersService {
  private players: Player[] = [{
    id: 'A1',
    level: this.levelsService.getLevel(1),
    name: 'User',
    points: 0
  }];

  constructor(private readonly tasksService: TasksService,
    private readonly levelsService: LevelsService) { }

  getAllPlayers(): Player[] {
    return this.players;
  }

  getActivePlayer(): Player {
    return this.players[0]; // DEMO
  }

  completeTasks(playerId: string, tasksId: string[]): Player {
    const player = this.players.find((p) => p.id === playerId);
    if (!player) {
      throw new NotFoundException('Player not found');
    }

    tasksId.forEach(taskId => {
      const task = this.tasksService.getTask(taskId);
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      task.status = Status.Done;
      this.tasksService.updateTask(task);
      if (task) {
        player.points += task.points;
      } else {
        throw new NotFoundException('Task not found');
      }
    });

    if (this.levelsService.shouldLevelUp(player)) {
      this.levelsService.levelUpPlayer(player);
    }

    return player;
  }
}
