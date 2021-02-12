export class Player {
  public playerId: string;
  public firstName: string;
  public lastName: string;
  public avatarUrl: string;

  constructor(playerId: string, firstName: string, lastName: string, avatarUrl: string) {
    this.playerId = playerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatarUrl = avatarUrl;
  }
}
