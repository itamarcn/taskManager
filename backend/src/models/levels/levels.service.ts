import { Injectable } from '@nestjs/common';
import { Player } from '@app/../../shared/models/player/player.interface';
import { Level } from '@app/../../shared/models/level/level.interface';

@Injectable()
export class LevelsService {
    levels: Level[] = [{
        num: 1,
        name: 'Rookie',
        pointsRequiredForNextLevel: 20
    }, {
        num: 2,
        name: 'Intermediate',
        pointsRequiredForNextLevel: 40
    }, {
        num: 3,
        name: 'Advanced',
        pointsRequiredForNextLevel: 80
    }, {
        num: 4,
        name: 'Master',
        pointsRequiredForNextLevel: null
    }];

    levelUpPlayer(player: Player): void {
        if (player.level.num <= 4) {
            player.level = this.getLevel(player.level.num + 1);
        }
    }

    shouldLevelUp(player: Player): boolean {
        if (!player.level.pointsRequiredForNextLevel) {
            return false;
        }
        const currentLevel = this.levels.find(l => l.num === player.level.num);
        return player.points >= currentLevel.pointsRequiredForNextLevel;
    }

    getLevel(levelNumber: number): Level {
        return this.levels.find(l => l.num === levelNumber);
    }
}