import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { Level } from '../../../../shared/models/level/level.interface';

@Controller('levels')
export class LevelsController {
    constructor(private readonly levelsService: LevelsService) {}

  @Get(':id')
  getLevel(@Param('id') levelId: string): Level {
    return this.levelsService.getLevel(+levelId);
  }
}
