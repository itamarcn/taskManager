import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './players.service';
import { TasksService } from '../tasks/tasks.service';
import { LevelsService } from '../levels/levels.service';
import { Player } from '../../../../shared/models/player/player.interface';
import { NotFoundException } from '@nestjs/common';
import { Status } from '../../../../shared/models/task/status.enum';
import { Difficulty } from '../../../../shared/models/task/difficulty.enum';

describe('PlayersService', () => {
  let service: PlayersService;
  let tasksService: TasksService;
  let levelsService: LevelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        LevelsService,
        {
          provide: TasksService,
          useValue: {
            getTask: jest.fn(),
            updateTask: jest.fn(),
          },
        },
        {
          provide: LevelsService,
          useValue: {
            getLevel: jest.fn(),
            shouldLevelUp: jest.fn(),
            levelUpPlayer: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
    tasksService = module.get<TasksService>(TasksService);
    levelsService = module.get<LevelsService>(LevelsService);
  });

  describe('getAllPlayers', () => {
    it('should return an array of players', () => {
      const players: Player[] = [{ id: 'A1', name: 'User', level: { num: 1, name: 'Rookie', pointsRequiredForNextLevel: 20 }, points: 0 }];
      jest.spyOn(service, 'getAllPlayers').mockReturnValue(players);

      expect(service.getAllPlayers()).toEqual(players);
    });
  });

  describe('getActivePlayer', () => {
    it('should return the active player', () => {
      const activePlayer: Player = { id: 'A1', name: 'User', level: { num: 1, name: 'Rookie', pointsRequiredForNextLevel: 20 }, points: 0 };
      jest.spyOn(service, 'getActivePlayer').mockReturnValue(activePlayer);

      expect(service.getActivePlayer()).toEqual(activePlayer);
    });
  });

  describe('completeTasks', () => {
    it('should complete tasks for a player', () => {
      const playerId = 'A1';
      const tasksId = ['task1', 'task2'];
      const player: Player = {
        id: 'A1',
        name: 'User',
        level: { num: 1, name: 'Rookie', pointsRequiredForNextLevel: 20 },
        points: 0,
      };
      const task1 = { id: 'task1', status: Status.Ready, points: 10, title: 'a', date: (new Date()).toISOString(), difficulty: Difficulty.Easy, description: 'test1', level: 1 };
      const task2 = { id: 'task2', status: Status.Ready, points: 15, title: 'b', date: (new Date()).toISOString(), difficulty: Difficulty.Hard, description: 'test2', level: 1 };

      jest.spyOn(service, 'getActivePlayer').mockReturnValue(player);
      jest.spyOn(tasksService, 'getTask').mockImplementation((taskId: string) => {
        if (taskId === 'task1') return task1;
        if (taskId === 'task2') return task2;
        return undefined;
      });

      const updatedPlayer = service.completeTasks(playerId, tasksId);

      expect(updatedPlayer.points).toEqual(task1.points + task2.points);
      expect(task1.status).toEqual(Status.Done);
      expect(task2.status).toEqual(Status.Done);
      expect(levelsService.shouldLevelUp).toHaveBeenCalled();
    });

    it('should throw NotFoundException when a task is not found', () => {
      const playerId = 'A1';
      const tasksId = ['task1', 'task2'];
      const player: Player = {
        id: 'A1',
        name: 'User',
        level: { num: 1, name: 'Rookie', pointsRequiredForNextLevel: 20 },
        points: 0,
      };

      jest.spyOn(service, 'getActivePlayer').mockReturnValue(player);
      jest.spyOn(tasksService, 'getTask').mockReturnValue(undefined);

      expect(() => service.completeTasks(playerId, tasksId)).toThrowError(NotFoundException);
    });
  });
});
