import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ScoreService {
  player1IdChanged = new Subject<string>();
  player2IdChanged = new Subject<string>();

  private player1: string;
  private player2: string;

  setPlayersId(player1Id: string, player2Id: string) {
    this.player1 = player1Id;
    this.player1IdChanged.next(this.player1.slice())
    this.player2 = player2Id;
    this.player2IdChanged.next(this.player2.slice())
    }

  getPlayer1Id() {
    return this.player1;
  }

  getPlayer2Id() {
    return this.player2;
  }
}
