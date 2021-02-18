import { Component, Directive, Injectable, Input, NgModule, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService } from 'src/app/data/data.service';
import { Match } from 'src/app/data/match.model';
import { Leg } from 'src/app/data/leg.model';
import { Throw } from 'src/app/data/throw.model';
import { GameService } from '../game.service';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-score-panel',
  templateUrl: './score-panel.component.html',
  styleUrls: ['./score-panel.component.css'],
})
export class ScorePanelComponent implements OnInit, OnDestroy {
  match: Match[];
  legs: Leg[];
  player1Id = '';
  player2Id = '';
  throw: Throw[];
  subscription: Subscription;

  loadedMatch = null;
  actualGame = null;
  changeActualAndLoaded = null;

  legPage = 1;
  legPageSize = 1;

  roundPage = 1;
  roundPageSize = 1;

  constructor(
    private dataService: DataService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.subscription = this.gameService.loadedMatchChanged.subscribe(
      (loadedMatch: boolean) => {
        this.loadedMatch = loadedMatch;
      }
    );
    this.loadedMatch = this.gameService.getLoadedMatch();

    this.subscription = this.gameService.actualGameChanged.subscribe(
      (actualGame: boolean) => {
        this.actualGame = actualGame;
      }
    );
    this.actualGame= this.gameService.getActualGame();

    this.subscription = this.gameService.changeActualAndLoadedChanged.subscribe(
      (changeActualAndLoaded: boolean) => {
        this.changeActualAndLoaded = changeActualAndLoaded;
      }
    );
    this.changeActualAndLoaded = this.gameService.getChangeActualAndLoaded();

    if(this.changeActualAndLoaded) {
      this.loadMatchDetails();
    }

    if(!this.changeActualAndLoaded) {
      this.loadActualGame();
    }
  }

  loadMatchDetails() {
    this.subscription = this.dataService.matchesChanged.subscribe(
      (match: Match[]) => {
        this.match = match;
      }
    );
    this.match = this.dataService.getMatches();

    this.subscription = this.dataService.legsChanged.subscribe(
      (legs: Leg[]) => {
        this.legs = legs;
      }
    );
    this.legs = this.dataService.getLegs();

    this.subscription = this.dataService.player1IdChanged.subscribe(
      (player1Id: string) => {
        this.player1Id = player1Id;
      }
    );
    this.player1Id = this.dataService.getPlayer1Id();

    this.subscription = this.dataService.player2IdChanged.subscribe(
      (player2Id: string) => {
        this.player2Id = player2Id;
      }
    );
    this.player2Id = this.dataService.getPlayer2Id();
  }

  loadActualGame() {
    this.subscription = this.gameService.newMatchChanged.subscribe(
      (match: Match[]) => {
        this.match = match;
      }
    );
    this.match = this.gameService.getNewMatch();

    this.subscription = this.gameService.newLegChanged.subscribe(
      (legs: Leg[]) => {
        this.legs = legs;
      }
    );
    this.legs = this.gameService.getNewLeg();

    this.subscription = this.gameService.newGamePlayer1IdChanged.subscribe(
      (player1Id: string) => {
        this.player1Id = player1Id;
      }
    );
    this.player1Id = this.gameService.getNewPlayer1Id();

    this.subscription = this.gameService.newGamePlayer2IdChanged.subscribe(
      (player2Id: string) => {
        this.player2Id = player2Id;
      }
    );
    this.player2Id = this.gameService.getNewPlayer2Id();
  }

  scoreCalculator(allThrow, actualRound: number) {
    let actualScore = 501;

    for(let i = 0; i < actualRound; i++) {
      actualScore -= allThrow[i].score;
    }
    return actualScore;
  }

  OnChangeActualAndLoaded() {
    this.gameService.setChangeActualAndLoaded(!this.changeActualAndLoaded);
  }

  onNewGame(boolean: boolean) {
    this.gameService.setScorePanelActive(boolean);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
