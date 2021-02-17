import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { GameService } from './game.service'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  subscription: Subscription;

  scorePanelActive = null;
  actualGame = null;
  loadedMatch = null;


  constructor (private gameService: GameService) {}

  ngOnInit(): void {
    this.subscription = this.gameService.scorePanelActiveChanged.subscribe(
      (scorePanelActive: boolean) => {
        this.scorePanelActive = scorePanelActive;
      }
    );
    this.scorePanelActive = this.gameService.getScorePanelActive();

    this.subscription = this.gameService.loadedMatchChanged.subscribe(
      (loadedMatch: boolean) => {
        this.loadedMatch = loadedMatch;
      }
    );
    this.loadedMatch = this.gameService.getLoadedMatch();
    console.log(this.loadedMatch);
  }
}
