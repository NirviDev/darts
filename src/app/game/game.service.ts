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

  player1TheNextChanged = new BehaviorSubject<boolean>(null);
  player2TheNextChanged = new BehaviorSubject<boolean>(null);

  matchIdChanged = new Subject<string>();
  matchChanged = new Subject<Match>();
  legsChanged = new Subject<Leg[]>();

  doubleLandingChanged = new BehaviorSubject<boolean>(null);
  dartsThrowNumberChanged = new BehaviorSubject<number>(0);
  player1ScoreChanged = new BehaviorSubject<number>(0);
  player2ScoreChanged = new BehaviorSubject<number>(0);

  private scorePanelActive: boolean = null;
  private loadedMatch: boolean = null;
  private actualGame: boolean = null;
  private changeActualAndLoaded: boolean = null;

  private player1TheNext: boolean = null;
  private player2TheNext: boolean = null;

  private matchId: string;
  private match: Match;
  private legs: Leg[] = [];

  private doubleLanding: boolean = null;
  private dartsThrowNumber: number = 0;
  private player1Score: number = 0;
  private player2Score: number = 0;

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

  addNewLeg(newLeg: Leg) {
    this.legs.push(newLeg);
    this.legsChanged.next(this.legs.slice())
  }

  addPlayer1Throw(player1Throw: Throw) {
    this.legs[this.legs.length-1].player1Throws.push(player1Throw);
    this.legsChanged.next(this.legs.slice());
  }

  addPlayer2Throw(player2Throw: Throw) {
    this.legs[this.legs.length-1].player2Throws.push(player2Throw);
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

  setAddDart(dartsThrowText: string, dartsThrowScore: number, multiplier: number) {
    console.log("Add dart")
    let player1Throws = this.legs[this.legs.length-1].player1Throws[this.legs[this.legs.length-1].player1Throws.length-1];
    let player2Throws = this.legs[this.legs.length-1].player2Throws[this.legs[this.legs.length-1].player2Throws.length-1];

    if(this.player1TheNext){
      player1Throws.darts[this.dartsThrowNumber] = dartsThrowText;
      player1Throws.score += dartsThrowScore;
      this.dartsThrowNumber += 1;
      this.player1Score += dartsThrowScore;

      if( this.player1Score === 501 && this.doubleLanding && multiplier === 2 ||
        this.player1Score === 501) {
        for(;this.dartsThrowNumber < 3; this.dartsThrowNumber++) {
          player1Throws.darts[this.dartsThrowNumber] = "0";
        }
        this.match.player1Score += 1
      } else if(this.player1Score > 501 ||
        this.doubleLanding && this.player1Score === 500 ||
        this.doubleLanding && this.player1Score === 501 && multiplier !== 2) {
        this.player1Score -= player1Throws.score;
        player1Throws.score = 0;
        for(;this.dartsThrowNumber < 3; this.dartsThrowNumber++) {
          player1Throws.darts[this.dartsThrowNumber] = "0";
        }
      }

      this.dartsThrowNumberChanged.next(this.dartsThrowNumber);
      this.legsChanged.next(this.legs.slice());
    } else if(this.player2TheNext){
      player2Throws.darts[this.dartsThrowNumber] = dartsThrowText;
      player2Throws.score += dartsThrowScore;
      this.dartsThrowNumber += 1;
      this.player2Score += dartsThrowScore;

      if(this.player2Score === 501 && this.doubleLanding && multiplier === 2 ||
        this.player2Score === 501) {
        for(;this.dartsThrowNumber < 3; this.dartsThrowNumber++) {
          player2Throws.darts[this.dartsThrowNumber] = "0";
        }
        this.match.player2Score += 1
      } else if(this.player2Score > 501 ||
        this.doubleLanding && this.player2Score === 500 ||
        this.doubleLanding && this.player2Score === 501 && multiplier !== 2) {
        this.player2Score -= player2Throws.score;
        player2Throws.score = 0;
        for(;this.dartsThrowNumber < 3; this.dartsThrowNumber++) {
          player2Throws.darts[this.dartsThrowNumber] = "0";
        }
      }

      this.dartsThrowNumberChanged.next(this.dartsThrowNumber);
      this.player1ScoreChanged.next(this.player1Score);
      this.player2ScoreChanged.next(this.player2Score);
      this.matchChanged.next(this.match)
      this.legsChanged.next(this.legs.slice());
    }
    console.log(this.legs);
    console.log(this.dartsThrowNumber);
  }

  setDoubleLanding(doubleLanding: boolean) {
    this.doubleLanding = doubleLanding;
    this.doubleLandingChanged.next(this.doubleLanding);
  }

  getDoubleLanding() {
    return this.doubleLanding;
  }

  setDartsThrowNumber(dartsThrowNumber: number) {
    this.dartsThrowNumber = dartsThrowNumber;
    this.dartsThrowNumberChanged.next(this.dartsThrowNumber);
  }

  getDartsThrowNumber() {
    return this.dartsThrowNumber;
  }

  setPlayer1Score(player1Score: number) {
    this.player1Score = player1Score;
    this.player1ScoreChanged.next(this.player1Score);
  }

  getPlayer1Score() {
    return this.player1Score;
  }

  setPlayer2Score(player2Score: number) {
    this.player2Score = player2Score;
    this.player2ScoreChanged.next(this.player2Score);
  }

  getPlayer2Score() {
    return this.player2Score;
  }
}
