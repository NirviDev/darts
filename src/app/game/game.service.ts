import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

import { Match } from "../data/match.model";
import { Leg } from "../data/leg.model";

@Injectable({ providedIn: 'root' })
export class GameService {
  scorePanelActiveChanged = new BehaviorSubject<boolean>(null);
  loadedMatchChanged = new BehaviorSubject<boolean>(null);
  actualGameChanged = new BehaviorSubject<boolean>(null);
  changeActualAndLoadedChanged = new BehaviorSubject<boolean>(null);

  newMatchChanged = new Subject<Match[]>(); //Matches data
  newLegChanged = new Subject<Leg[]>(); //Legs data
  newGamePlayer1IdChanged = new Subject<string>(); //Legs data
  newGamePlayer2IdChanged = new Subject<string>(); //Legs data

  private scorePanelActive: boolean = null;
  private loadedMatch: boolean = null;
  private actualGame: boolean = null;
  private changeActualAndLoaded: boolean = null;

  private match: Match[] = [];
  private leg: Leg[] = [];
  private player1: string;
  private player2: string;


  setNewMatch(match: Match[]){
    this.match = match;
    this.newMatchChanged.next(this.match);
  }

  getNewMatch() {
    return this.match;
  }

  setNewLeg(leg: Leg[]){
    this.leg = leg;
    this.newLegChanged.next(this.leg.slice());
  }

  getNewLeg() {
    return this.leg.slice();
  }

  setNewPlayersId(player1Id: string, player2Id: string) {
    this.player1 = player1Id;
    this.newGamePlayer1IdChanged.next(this.player1);
    this.player2 = player2Id;
    this.newGamePlayer2IdChanged.next(this.player2);
    }

  getNewPlayer1Id() {
    return this.player1;
  }

  getNewPlayer2Id() {
    return this.player2;
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
}
