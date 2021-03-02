import {
  Component,
  Injectable,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService } from 'src/app/data/data.service';
import { GameService } from '../game.service';
import { GameStorageService } from '../game-storage.service';
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

  addThrowBackData: boolean = null;

  matches: Match[];

  matchId:string = "";
  match: Match;
  legs: Leg[];

  newLeg: Leg;
  newThrow: Throw;

  player1TheNext: boolean = null;
  player2TheNext: boolean = null;

  doubleLanding: boolean = null;
  dartsThrowNumber: number = 0;
  player1Score: number = 0;
  player2Score: number = 0;

  legPage = 1;
  legPageSize = 1;

  roundPage = 1;
  roundPageSize = 1;

  constructor(
    private dataService: DataService,
    private gameService: GameService,
    private gameStorageService: GameStorageService
  ) {}

  ngOnInit(): void {
    console.log("#############<Score panel data>#############");

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

    this.subscription = this.gameStorageService.addThrowBackDataChanged.subscribe(
      (boolean: boolean) => {
        this.addThrowBackData = boolean;

        if(this.addThrowBackData){
          this.gameStorageService.setAddThrowBackData(false);

          if(this.player1Score === 501 || this.player2Score === 501 &&
            this.match.legsToWin !== this.match.player1Score &&
            this.match.legsToWin !== this.match.player2Score) {
            this.gameService.setPlayer1Score(0);
            this.gameService.setPlayer2Score(0);

            this.newLeg = {matchId:this.matchId, numberOfLeg: this.legs.length + 1, player1Throws: [], player2Throws: []}
            this.gameService.addNewLeg(this.newLeg);
            console.log("New leg added")
          }
          this.gameService.setDartsThrowNumber(0);
          this.loadActualGame();
        }
      }
    );
    this.addThrowBackData = this.gameStorageService.getAddThrowBackData();

    if (this.changeActualAndLoaded) {
      this.loadMatchDetails();
    }

    if (!this.changeActualAndLoaded) {
      this.loadActualGame();
    }
  }

  loadMatchDetails() {
    console.log("-------------<Loaded match>-------------");
    console.log("Loaded match status: ", this.loadedMatch)
    console.log("Actual game status: ", this.actualGame)

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

    this.subscription = this.dataService.legsChanged.subscribe(
      (legs: Leg[]) => {
        this.legs = legs;
      }
    );
    this.legs = this.dataService.getLegs();
  }

  loadActualGame() {
    console.log("-------------<Actual game>-------------");
    console.log("Loaded match status: ", this.loadedMatch)
    console.log("Actual game status: ", this.actualGame)

    this.subscription = this.gameService.matchIdChanged.subscribe(
      (matchId: string) => {
        this.matchId = matchId;
      }
    );
    this.matchId = this.gameService.getMatchId();

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

    this.subscription = this.gameService.player1TheNextChanged.subscribe(
      (boolean: boolean) => {
        this.player1TheNext = boolean;
      }
    );
    this.player1TheNext = this.gameService.getPlayer1TheNext();

    this.subscription = this.gameService.player2TheNextChanged.subscribe(
      (boolean: boolean) => {
        this.player2TheNext = boolean;
      }
    );
    this.player2TheNext = this.gameService.getPlayer2TheNext();

    this.subscription = this.gameService.doubleLandingChanged.subscribe(
      (boolen: boolean) => {
        this.doubleLanding = boolen;
      }
    );
    this.doubleLanding = this.gameService.getDoubleLanding();

    this.subscription = this.gameService.dartsThrowNumberChanged.subscribe(
      (dartsThrowNumber: number) => {
        this.dartsThrowNumber = dartsThrowNumber;
      }
    );
    this.dartsThrowNumber = this.gameService.getDartsThrowNumber();

    this.subscription = this.gameService.player1ScoreChanged.subscribe(
      (player1Score: number) => {
        this.player1Score = player1Score;
      }
    );
    this.player1Score = this.gameService.getPlayer1Score();
    console.log("Player1Score: ", this.player1Score);

    this.subscription = this.gameService.player2ScoreChanged.subscribe(
      (player2Score: number) => {
        this.player2Score = player2Score;
      }
    );
    this.player2Score = this.gameService.getPlayer2Score();
    console.log("Player2Score: ", this.player2Score);

    if(
      this.match.legsToWin !== this.match.player1Score &&
      this.match.legsToWin !== this.match.player2Score
    ) {
      console.log('This is opened match');
      let player1Throws = this.legs[this.legs.length - 1].player1Throws;
      let player2Throws = this.legs[this.legs.length - 1].player2Throws;

      if(this.legs.length % 2 === 1) {
        if (player1Throws.length === 0 ||
          player1Throws.length === player2Throws.length &&
          this.dartsThrowNumber === 0 &&
          player2Throws[player2Throws.length-1].darts[2] !== "" &&
          player2Throws[player2Throws.length-1].darts[2] !== undefined &&
          this.player2Score != 501
      ) {
        this.gameService.setPlayer1TheNext(true);
        this.gameService.setPlayer2TheNext(false);

        this.newThrow = {playerId: this.match.player1.playerId, darts: ["", "", ""], score: 0, round: player1Throws.length + 1};

        this.gameService.addPlayer1Throw(this.newThrow);
        console.log('Player1 the next player');
      } else if (player2Throws.length < player1Throws.length &&
        this.dartsThrowNumber === 0 &&
        player1Throws[player1Throws.length-1].darts[2] !== "" &&
        player1Throws[player1Throws.length-1].darts[2] !== undefined &&
        this.player1Score != 501
      ) {
        this.gameService.setPlayer1TheNext(false);
        this.gameService.setPlayer2TheNext(true);

        this.newThrow = {playerId: this.match.player2.playerId, darts: ["", "", ""], score: 0, round: player2Throws.length + 1};

        this.gameService.addPlayer2Throw(this.newThrow);
        console.log('Player2 the next player');
      }
      } else if(this.legs.length % 2 === 0) {
        if (player2Throws.length === 0 ||
          player2Throws.length === player1Throws.length &&
          this.dartsThrowNumber === 0 &&
          player1Throws[player1Throws.length-1].darts[2] !== "" &&
          player1Throws[player1Throws.length-1].darts[2] !== undefined &&
          this.player1Score != 501
      ) {
        this.gameService.setPlayer1TheNext(false);
        this.gameService.setPlayer2TheNext(true);

        this.newThrow = {playerId: this.match.player2.playerId, darts: ["", "", ""], score: 0, round: player2Throws.length + 1};

        this.gameService.addPlayer2Throw(this.newThrow);
        console.log('Player2 the next player');
      } else if (player1Throws.length < player2Throws.length &&
        this.dartsThrowNumber === 0 &&
        player2Throws[player2Throws.length-1].darts[2] !== "" &&
        player2Throws[player2Throws.length-1].darts[2] !== undefined &&
        this.player2Score != 501
      ) {
        this.gameService.setPlayer1TheNext(true);
        this.gameService.setPlayer2TheNext(false);

        this.newThrow = {playerId: this.match.player1.playerId, darts: ["", "", ""], score: 0, round: player1Throws.length + 1};

        this.gameService.addPlayer1Throw(this.newThrow);
        console.log('Player1 the next player');
      }
      }
    }
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

    this.gameService.setMatchId(this.matchId);
    this.gameService.setMatch(this.match);
    this.gameService.setLegs(this.legs);

    let player1Throws = this.legs[this.legs.length - 1].player1Throws;
    let player2Throws = this.legs[this.legs.length - 1].player2Throws;

    if (player1Throws.length > 0) {
      player1Throws.map((player1Throw) => {
        this.player1Score += player1Throw.score;
        this.gameService.setPlayer1Score(this.player1Score);
      });
      console.log('Player1 score calculated');
    }
    console.log('Player1 score: ', this.player1Score);

    if (player2Throws.length > 0) {
      player2Throws.map((player2Throw) => {
         this.player2Score += player2Throw.score;
        this.gameService.setPlayer2Score(this.player2Score);
      });
      console.log('Player2 score calculated');
    }
    console.log('Player2 score: ', this.player2Score);

    this.loadActualGame();
  }

  onAddThrow() {
    if(this.player1TheNext) {
      let player1Throws = this.legs[this.legs.length-1].player1Throws[this.legs[this.legs.length-1].player1Throws.length-1];
      this.gameStorageService.addThrow(this.matchId, player1Throws);
    } else if(this.player2TheNext) {
      let player2Throws = this.legs[this.legs.length-1].player2Throws[this.legs[this.legs.length-1].player2Throws.length-1];
      this.gameStorageService.addThrow(this.matchId, player2Throws);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
