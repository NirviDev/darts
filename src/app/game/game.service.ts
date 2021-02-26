import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

import { Match } from "../data/match.model";
import { Leg } from "../data/leg.model";
import { Throw } from "../data/throw.model";

@Injectable({ providedIn: 'root' })
export class GameService {
  scorePanelActiveChanged = new BehaviorSubject<boolean>(null);
  loadedMatchChanged = new BehaviorSubject<boolean>(null);
  actualGameChanged = new BehaviorSubject<boolean>(null);
  changeActualAndLoadedChanged = new BehaviorSubject<boolean>(null);

  dartsThrowNumberChanged = new BehaviorSubject<number>(0);
  player1TheNextChanged = new BehaviorSubject<boolean>(null);
  player2TheNextChanged = new BehaviorSubject<boolean>(null);

  matchIdChanged = new Subject<string>();
  matchChanged = new Subject<Match>();
  legsChanged = new Subject<Leg[]>();

  private scorePanelActive: boolean = null;
  private loadedMatch: boolean = null;
  private actualGame: boolean = null;
  private changeActualAndLoaded: boolean = null;

  private dartsThrowNumber: number = 0;
  private player1TheNext: boolean = null;
  private player2TheNext: boolean = null;

  private matchId: string;
  private match: Match;
  private legs: Leg[] = [];


  setMatchId(matchId: string) {
    this.matchId = matchId;
    this.matchIdChanged.next(this.matchId);
    }

  getMatchId() {
    return this.matchId;
  }

  setMatch(match: Match){
    this.match = match;
    this.matchChanged.next(this.match);
  }

  getMatch() {
    return this.match;
  }

  setLegs(leg: Leg[]){
    this.legs = leg;
    this.legsChanged.next(this.legs.slice());
  }

  getLegs() {
    return this.legs.slice();
  }

  addPlayer1Throw(player1Throw: Throw) {
    this.legs[this.legs.length-1].player1Throws.push(player1Throw);
    this.legsChanged.next(this.legs.slice());
  }

  setScorePanelActive(boolean: boolean){
    this.scorePanelActive = boolean;
    this.scorePanelActiveChanged.next(this.scorePanelActive);
  }

  getScorePanelActive() {
    return this.scorePanelActive;
  }

  setLoadedMatch(boolean: boolean){
    this.loadedMatch = boolean;
    this.loadedMatchChanged.next(this.loadedMatch);
  }

  getLoadedMatch() {
    return this.loadedMatch;
  }

  setActualGame(boolean: boolean){
    this.actualGame = boolean;
    this.actualGameChanged.next(this.actualGame);
  }

  getActualGame() {
    return this.actualGame;
  }

  setChangeActualAndLoaded(boolean: boolean){
    this.changeActualAndLoaded = boolean;
    this.changeActualAndLoadedChanged.next(this.changeActualAndLoaded);
  }

  getChangeActualAndLoaded() {
    return this.changeActualAndLoaded;
  }

  setPlayer1TheNext(boolean: boolean){
    this.player1TheNext = boolean;
    this.player1TheNextChanged.next(this.player1TheNext);
  }

  getPlayer1TheNext() {
    return this.player1TheNext;
  }

  setPlayer2TheNext(boolean: boolean){
    this.player2TheNext = boolean;
    this.player2TheNextChanged.next(this.player2TheNext);
  }

  getPlayer2TheNext() {
    return this.player2TheNext;
  }

  setAddDart(dartsThrowText: string, dartsThrowScore: number) {
    console.log("Add dart")

    if(this.player1TheNext){
      this.legs[this.legs.length-1].player1Throws[this.legs[this.legs.length-1].player1Throws.length-1].darts[this.dartsThrowNumber] = dartsThrowText;
      this.legs[this.legs.length-1].player1Throws[this.legs[this.legs.length-1].player1Throws.length-1].score += dartsThrowScore;
      this.dartsThrowNumber += 1;

      this.dartsThrowNumberChanged.next(this.dartsThrowNumber);
      this.legsChanged.next(this.legs.slice());
    }
    console.log(this.legs);
  }
}
