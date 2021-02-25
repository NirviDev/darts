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

  matchChanged = new Subject<Match>(); //Matches data
  legsChanged = new Subject<Leg[]>(); //Legs data

  private scorePanelActive: boolean = null;
  private loadedMatch: boolean = null;
  private actualGame: boolean = null;
  private changeActualAndLoaded: boolean = null;

  private match: Match;
  private legs: Leg[] = [];


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
