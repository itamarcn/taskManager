import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { TasksModule } from '../tasks/tasks.module';
import { LevelsModule } from '../levels/levels.module';

@Module({
  imports: [TasksModule, LevelsModule],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
