import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Match } from '../data/match.model';
import { GameService } from './game.service';
import { Throw } from '../data/throw.model';

@Injectable({ providedIn: 'root' })
export class GameStorageService {
  proxy: string = "http://127.0.0.1:8080/";
  baseUrl: string = 'https://insimu-darts-api.azurewebsites.net/darts_api/';

  constructor(
    private http: HttpClient,
    private gameService: GameService
    ) { }

  createMatch(player1Id: string, player2Id: string, legsToWin: number) {
    const httpHeaders = new HttpHeaders()
    .append("authToken", environment.authToken)

    const data = {
      "player1Id": player1Id,
      "player2Id": player2Id,
      "legsToWin": legsToWin
    }

    this.http
    .post<Match>(
      this.proxy + this.baseUrl + "createMatch?player1Id=" + player1Id + "&player2Id=" + player2Id + "&legsToWin=" + legsToWin,
      data, {headers: httpHeaders}
    ).subscribe(match => {
      this.gameService.setMatch(match);
    });
  }

  addThrow(matchId: string, playerThrow: Throw) {
    const httpHeaders = new HttpHeaders()
    .append("authToken", environment.authToken)

    this.http
    .post<Throw>(
      this.proxy + this.baseUrl + "addThrow?matchId=" + matchId,
      playerThrow, {headers: httpHeaders}
    ).subscribe(playerThrow => {
      /* this.gameService.setMatch(playerThrow); */
      console.log("Add throw back data", playerThrow)
    });
  }
}
