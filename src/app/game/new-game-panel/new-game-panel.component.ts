import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { GameService } from '../game.service';
import { Player } from 'src/app/data/players/player.model';
import { DataService } from 'src/app/data/data.service';
import { DataStorageService } from 'src/app/data/data-storage.service';

@Component({
  selector: 'app-new-game-panel',
  templateUrl: './new-game-panel.component.html',
  styleUrls: ['./new-game-panel.component.css'],
})
export class NewGamePanelComponent implements OnInit, OnDestroy {
  players: Player[];
  subscription: Subscription;

  loadedMatch = null;

  selectedPlayer1 = "";
  selectedPlayer2 = "";

  constructor(
    private dataService: DataService,
    private dataStorageService: DataStorageService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.dataStorageService.fetchPlayers().subscribe();

    this.subscription = this.dataService.playersChanged.subscribe(
      (players: Player[]) => {
        this.players = players;
      }
    );
    this.players = this.dataService.getPlayers();

    this.subscription = this.gameService.loadedMatchChanged.subscribe(
      (loadedMatch: boolean) => {
        this.loadedMatch = loadedMatch;
      }
    );
    this.loadedMatch = this.gameService.getLoadedMatch();
  }

  onBackToScorePanel(boolean: boolean) {
    this.gameService.setScorePanelActive(boolean);
  }

  selectPlayer1(event) {
    this.selectedPlayer1 = event.target.value;
  }

  selectPlayer2(event) {
    this.selectedPlayer2 = event.target.value;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
