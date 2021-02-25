export class Throw {
  public playerId: string;
  public darts: [];
  public score: number;
  public round: number;

  constructor(playerId: string, darts: [], score: number, round: number) {
    this.playerId = playerId;
    this.darts = darts;
    this.score = score;
    this.round = round;
  }
}
