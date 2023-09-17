import { Test, TestingModule } from '@nestjs/testing';
import { LevelsController } from './levels.controller';
import { LevelsService } from './levels.service';
import { Level } from '../../../../shared/models/level/level.interface';

describe('LevelsController', () => {
  let controller: LevelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LevelsController],
      providers: [LevelsService],
    }).compile();

    controller = module.get<LevelsController>(LevelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a level by ID', () => {
    const levelId = '1';
    const result: Level = {
      num: 1,
      name: 'Rookie',
      pointsRequiredForNextLevel: 20,
    };
    expect(controller.getLevel(levelId)).toEqual(result);
  });
});
