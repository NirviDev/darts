import { Player } from "./players/player.model";

export class Match {
  public matchId: string;
  public player1: Player;
  public player2: Player;
  public legsToWin: number;
  public player1Score: number;
  public player2Score: number;

  constructor(matchId: string, player1: Player, player2: Player, legsToWin: number, player1Score: number, player2Score: number) {
    this.matchId = matchId;
    this.player1 = player1;
    this.player2 = player2;
    this.legsToWin = legsToWin;
    this.player1Score = player1Score;
    this.player2Score = player2Score;
  }
}
