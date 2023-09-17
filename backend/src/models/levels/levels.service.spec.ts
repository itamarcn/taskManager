import { Test, TestingModule } from '@nestjs/testing';
import { LevelsService } from './levels.service';
import { Level } from '../../../../shared/models/level/level.interface';
import { Player } from '../../../../shared/models/player/player.interface';

describe('LevelsService', () => {
  let service: LevelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LevelsService],
    }).compile();

    service = module.get<LevelsService>(LevelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should level up a player', () => {
    const player: Player = {
      id: '1',
      level: { num: 1, name: 'Rookie', pointsRequiredForNextLevel: 20 },
      name: 'Test Player',
      points: 25,
    };

    service.levelUpPlayer(player);

    expect(player.level.num).toBe(2);
  });

  it('should determine if a player should level up', () => {
    const player: Player = {
      id: '1',
      level: { num: 1, name: 'Rookie', pointsRequiredForNextLevel: 20 },
      name: 'Test Player',
      points: 25,
    };

    const shouldLevelUp = service.shouldLevelUp(player);

    expect(shouldLevelUp).toBe(true);
  });

  it('should get a level by number', () => {
    const levelNumber = 1;
    const result: Level = {
      num: 1,
      name: 'Rookie',
      pointsRequiredForNextLevel: 20,
    };

    expect(service.getLevel(levelNumber)).toEqual(result);
  });
});
