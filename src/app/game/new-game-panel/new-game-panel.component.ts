import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { GameService } from '../game.service'

@Component({
  selector: 'app-new-game-panel',
  templateUrl: './new-game-panel.component.html',
  styleUrls: ['./new-game-panel.component.css']
})
export class NewGamePanelComponent implements OnInit {
  subscription: Subscription;

  loadedMatch = null;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.subscription = this.gameService.loadedMatchChanged.subscribe(
      (loadedMatch: boolean) => {
        this.loadedMatch = loadedMatch;
      }
    );
    this.loadedMatch = this.gameService.getLoadedMatch();
  }

  onBackScorePanel(boolean: boolean) {
    this.gameService.setScorePanelActive(boolean);
  }
}
