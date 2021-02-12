import { Throw } from './throw.model'

export class Leg {
  public matchId: string;
  public numberOfLeg: number;
  public player1Throws: Throw[];
  public player2Throws: Throw[];

  constructor(matchId: string, numberOfLeg: number, player1Throws: Throw[], player2Throws: Throw[]) {
    this.matchId = matchId;
    this.numberOfLeg = numberOfLeg;
    this.player1Throws = player1Throws;
    this.player2Throws = player2Throws;
  }
}
