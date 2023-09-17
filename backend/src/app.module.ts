import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './models/players/players.module';
import { TasksModule } from './models/tasks/tasks.module';
import { LevelsModule } from './models/levels/levels.module';

@Module({
  imports: [PlayersModule, TasksModule, LevelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
