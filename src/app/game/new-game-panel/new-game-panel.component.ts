import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DataService } from 'src/app/data/data.service';
import { DataStorageService } from 'src/app/data/data-storage.service';
import { GameService } from '../game.service';
import { GameStorageService } from '../game-storage.service';
import { Player } from 'src/app/data/players/player.model';

@Component({
  selector: 'app-new-game-panel',
  templateUrl: './new-game-panel.component.html',
  styleUrls: ['./new-game-panel.component.css'],
})
export class NewGamePanelComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: true }) newGameForm: NgForm;
  players: Player[];
  subscription: Subscription;

  loadedMatch = null;

  defaultLegsToWin = 3;
  player1:string;
  player2:string;
  legsToWin:number = null;

  constructor(
    private dataService: DataService,
    private dataStorageService: DataStorageService,
    private gameService: GameService,
    private gameStorageService: GameStorageService
  ) {}

  ngOnInit(): void {
    this.dataStorageService.fetchPlayers().subscribe();

    this.subscription = this.dataService.playersChanged.subscribe(
      (players: Player[]) => {
        this.players = players;
      }
    );
    this.players = this.dataService.getPlayers();
  }

  onSubmit() {
    this.player1 = this.newGameForm.value.player1Id;
    this.player2 = this.newGameForm.value.player2Id;
    this.legsToWin = this.newGameForm.value.legsToWin;

    this.gameStorageService.createMatch(this.player1, this.player2, this.legsToWin);
    this.gameService.setActualGame(true);
    this.gameService.setChangeActualAndLoaded(false);
    this.gameService.setScorePanelActive(true);
    this.newGameForm.reset();
  }

  onBackToScorePanel(boolean: boolean) {
    this.gameService.setScorePanelActive(boolean);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
