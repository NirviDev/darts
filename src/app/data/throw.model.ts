export class Throw {
  public playerId: string;
  public darts: [string, string, string];
  public score: number;
  public round: number;

  constructor(playerId: string, darts: [string, string, string], score: number, round: number) {
    this.playerId = playerId;
    this.darts = darts;
    this.score = score;
    this.round = round;
  }
}
