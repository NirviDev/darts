import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Match } from "./match.model";
import { Leg } from "./leg.model";
import { Player } from "./players/player.model";

@Injectable()
export class DataService {
  matchesChanged = new Subject<Match[]>(); //Matches data
  legsChanged = new Subject<Leg[]>(); //Legs data
  player1IdChanged = new Subject<string>(); //Legs data
  player2IdChanged = new Subject<string>(); //Legs data
  playersChanged = new Subject<Player[]>(); //Players data

  private matches: Match[] = [];
  private legs: Leg[] = [];
  private player1: string;
  private player2: string;
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

  setPlayersId(player1Id: string, player2Id: string) {
    this.player1 = player1Id;
    this.player1IdChanged.next(this.player1);
    this.player2 = player2Id;
    this.player2IdChanged.next(this.player2);
    }

    getPlayer1Id() {
      return this.player1;
    }

    getPlayer2Id() {
      return this.player2;
    }

  setPlayers(players: Player[]) {
    this.players = players;
    this.playersChanged.next(this.players.slice());
  }

  getPlayers() {
    return this.players.slice();
  }
}
