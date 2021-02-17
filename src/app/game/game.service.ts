import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Match } from "../data/match.model";
import { Leg } from "../data/leg.model";

@Injectable({ providedIn: 'root' })
export class GameService {
  scorePanelActiveChanged = new Subject<boolean>();
  loadedMatchChanged = new Subject<boolean>();

  newMatchChanged = new Subject<Match[]>(); //Matches data
  newLegsChanged = new Subject<Leg[]>(); //Legs data
  newGamePlayer1IdChanged = new Subject<string>(); //Legs data
  newGamePlayer2IdChanged = new Subject<string>(); //Legs data

  private scorePanelActive: boolean;
  private loadedMatch: boolean;

  private matches: Match[] = [];
  private legs: Leg[] = [];
  private player1: string;
  private player2: string;

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
}
