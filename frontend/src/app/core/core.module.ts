import { NgModule } from "@angular/core";
import { TaskService } from './services/task.service'
import { PlayerService } from "./services/player.service";
import { LevelService } from "./services/level.service";

@NgModule({
    declarations: [],
    imports: [],
    providers: [TaskService, PlayerService, LevelService]
})
export class CoreModule { }