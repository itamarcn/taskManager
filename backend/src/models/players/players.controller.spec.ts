import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { Player } from '../../../../shared/models/player/player.interface';
import { NotFoundException } from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service';
import { LevelsService } from '../levels/levels.service';

jest.mock('../tasks/tasks.service');
jest.mock('../levels/levels.service');

describe('PlayersController', () => {
  let controller: PlayersController;
  let service: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [PlayersService, TasksService, LevelsService],
    }).compile();

    controller = module.get<PlayersController>(PlayersController);
    service = module.get<PlayersService>(PlayersService);
  });

  describe('getAllPlayers', () => {
    it('should return an array of players', () => {
      const players: Player[] = [{ id: 'A1', name: 'User', level: { num: 1, name: 'Rookie', pointsRequiredForNextLevel: 20 }, points: 0 }];
      jest.spyOn(service, 'getAllPlayers').mockReturnValue(players);

      expect(controller.getAllPlayers()).toEqual(players);
    });
  });

  describe('getActivePlayer', () => {
    it('should return the active player', () => {
      const activePlayer: Player = { id: 'A1', name: 'User', level: { num: 1, name: 'Rookie', pointsRequiredForNextLevel: 20 }, points: 0 };
      jest.spyOn(service, 'getActivePlayer').mockReturnValue(activePlayer);

      expect(controller.getActivePlayer()).toEqual(activePlayer);
    });
  });

  describe('completeTask', () => {
    it('should complete tasks for a player', () => {
      const playerId = 'A1';
      const tasksId = ['task1', 'task2'];
      const updatedPlayer: Player = {
        id: 'A1',
        name: 'User',
        level: { num: 1, name: 'Rookie', pointsRequiredForNextLevel: 20 },
        points: 5, // Assuming points earned from completing tasks
      };

      jest.spyOn(service, 'completeTasks').mockReturnValue(updatedPlayer);

      expect(controller.completeTask(playerId, { tasksId })).toEqual(updatedPlayer);
    });

    it('should throw NotFoundException when the player is not found', () => {
      const playerId = 'A2'; // Player with ID 'A2' doesn't exist
      const tasksId = ['task1', 'task2'];

      jest.spyOn(service, 'completeTasks').mockImplementation(() => {
        throw new NotFoundException('Player not found');
      });

      expect(() => controller.completeTask(playerId, { tasksId })).toThrowError(NotFoundException);
    });
  });
});
