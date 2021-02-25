import {
  Component,
  Injectable,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService } from 'src/app/data/data.service';
import { GameService } from '../game.service';
import { Match } from 'src/app/data/match.model';
import { Leg } from 'src/app/data/leg.model';
import { Throw } from 'src/app/data/throw.model';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-score-panel',
  templateUrl: './score-panel.component.html',
  styleUrls: ['./score-panel.component.css'],
})
export class ScorePanelComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  loadedMatch = null;
  actualGame = null;
  changeActualAndLoaded = null;

  matches: Match[];

  matchId = '';
  match: Match;
  legs: Leg[];
  throw: Throw[];

  player1TheNext: boolean = null;
  player2TheNext: boolean = null;

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
    this.actualGame = this.gameService.getActualGame();

    this.subscription = this.gameService.changeActualAndLoadedChanged.subscribe(
      (changeActualAndLoaded: boolean) => {
        this.changeActualAndLoaded = changeActualAndLoaded;
      }
    );
    this.changeActualAndLoaded = this.gameService.getChangeActualAndLoaded();

    if (this.changeActualAndLoaded) {
      this.loadMatchDetails();
    }

    if (!this.changeActualAndLoaded) {
      this.loadActualGame();
    }
  }

  loadMatchDetails() {
    this.subscription = this.dataService.matchIdChanged.subscribe(
      (matchId: string) => {
        this.matchId = matchId;
      }
    );
    this.matchId = this.dataService.getMatchId();

    this.subscription = this.dataService.matchesChanged.subscribe(
      (matches: Match[]) => {
        this.matches = matches;
      }
    );
    this.matches = this.dataService.getMatches();

    this.matches.map((match: Match) => {
      if (match.matchId === this.matchId) {
        this.match = match;
      }
    });
    console.log('ScoreMatch: ', this.match);

    this.subscription = this.dataService.legsChanged.subscribe(
      (legs: Leg[]) => {
        this.legs = legs;
      }
    );
    this.legs = this.dataService.getLegs();

    setTimeout(() => {
      if (
        this.match.legsToWin !== this.match.player1Score &&
        this.match.legsToWin !== this.match.player2Score
      ) {
        let player1Throws = this.legs[this.legs.length - 1].player1Throws;
        let player1Score = 0;
        let player2Throws = this.legs[this.legs.length - 1].player2Throws;
        let player2Score = 0;

        if (player1Throws.length > 0) {
          player1Throws.map((player1Throw) => {
            player1Score += player1Throw.score;
          });
          console.log('Player1 score calculated');
        }
        console.log('Player1 score: ', player1Score);

        if (player2Throws.length > 0) {
          player2Throws.map((player2Throw) => {
            player2Score += player2Throw.score;
          });
          console.log('Player2 score calculated');
        }
        console.log('Player2 score: ', player2Score);

        if (
          player1Throws.length < 1 ||
          (player1Throws.length ==
            player2Throws.length &&
            player2Score != 501)
        ) {
          this.player1TheNext = true;
          this.player2TheNext = false;
          console.log('Player1 the next player');
          console.log('Player1', this.player1TheNext);
          console.log('Player2', this.player2TheNext);
        } else if (
          player2Throws.length <
            player1Throws.length &&
          player1Score != 501
        ) {
          this.player2TheNext = true;
          this.player1TheNext = false;
          console.log('Player2 the next player');
          console.log('Player1', this.player1TheNext);
          console.log('Player2', this.player2TheNext);
        }
        console.log('Closed match visit: false');
      }
    }, 500);
  }

  loadActualGame() {
    this.subscription = this.gameService.matchChanged.subscribe(
      (match: Match) => {
        this.match = match;
      }
    );
    this.match = this.gameService.getMatch();

    this.subscription = this.gameService.legsChanged.subscribe(
      (legs: Leg[]) => {
        this.legs = legs;
      }
    );
    this.legs = this.gameService.getLegs();
  }

  scoreCalculator(allThrow, actualRound: number) {
    let actualScore = 501;

    for (let i = 0; i < actualRound; i++) {
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

  onContinueGame() {
    this.gameService.setLoadedMatch(false);
    this.gameService.setActualGame(true);
    this.gameService.setChangeActualAndLoaded(false);

    this.gameService.setMatch(this.match);
    this.gameService.setLegs(this.legs);

    this.loadActualGame();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
