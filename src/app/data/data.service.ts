import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Match } from "./match.model";
import { Leg } from "./leg.model";
import { Player } from "./players/player.model";

@Injectable()
export class DataService {
  matchesChanged = new Subject<Match[]>();
  legsChanged = new Subject<Leg[]>();
  playersChanged = new Subject<Player[]>();

  private matches: Match[] = [];
  private legs: Leg[] = [];
  private players: Player[] = [];

  setMatches(matches: Match[]) {
    this.matches = matches;
    this.matchesChanged.next(this.matches.slice());
  }

  getMatches() {
    return this.matches.slice();
  }

  setLegs(legs: Leg[]) {
    this.legs = legs;
    this.legsChanged.next(this.legs.slice());
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
