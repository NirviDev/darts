import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

import { Player } from "./players/player.model";
import { Match } from "./match.model";
import { Leg } from "./leg.model";

@Injectable()
export class DataService {
  playersChanged = new Subject<Player[]>(); //Players data
  matchesChanged = new Subject<Match[]>(); //Matches data

  matchIdChanged = new Subject<string>(); //Legs data
  legsChanged = new Subject<Leg[]>(); //Legs data

  private players: Player[] = [];
  private matches: Match[] = [];

  private matchId: string;
  private legs: Leg[] = [];

  setMatches(matches: Match[]) {
    this.matches = matches;
    this.matchesChanged.next(this.matches.slice());
  }

  getMatches() {
    return this.matches.slice();
  }

  setMatchId(matchId: string) {
    this.matchId = matchId;
    this.matchIdChanged.next(this.matchId);
    }

  getMatchId() {
    return this.matchId;
  }

  setLegs(legs: Leg[]) {
    this.legs = legs;
    this.legsChanged.next(this.legs.slice());
    console.log("ScoreLegs: ", this.legs)
  }

  getLegs() {
    return this.legs.slice();
  }

  setPlayers(players: Player[]) {
    this.players = players;
    this.playersChanged.next(this.players.slice());
  }

  getPlayers() {
    return this.players.slice();
  }
}
