import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from '../../../../shared/models/player/player.interface';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  getAllPlayers(): Player[] {
    return this.playersService.getAllPlayers();
  }

  @Get('active')
  getActivePlayer(): Player {
    return this.playersService.getActivePlayer();
  }

  @Post('complete-tasks/:playerId')
  completeTask(
    @Param('playerId') playerId: string,
    @Body() completedTask: { tasksId: string[]; },
  ): Player {
    return this.playersService.completeTasks(playerId, completedTask.tasksId);
  }
}
