import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { DataService } from './data.service';
import { Match } from './match.model';
import { Leg } from './leg.model';
import { Player } from './players/player.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  proxy = "http://127.0.0.1:8080/"
  baseUrl = 'https://insimu-darts-api.azurewebsites.net/darts_api/'

  constructor(
    private http: HttpClient,
    private dataService: DataService
    ) { }

  ngOnInit(): void {
  }

  fetchMatches() {
    return this.http
    .get<Match[]>(
      this.proxy + this.baseUrl + "allMatches",
      {headers: new HttpHeaders().set("authToken", environment.authToken) }
    )
    .pipe(
      map(matches => {
        return matches;
      }),
      tap(matches => {
        this.dataService.setMatches(matches);
      })
    );
  }

  fetchLegs(matchId: string) {
    return this.http
    .get<Leg[]>(
      this.proxy + this.baseUrl + "matchLegs" + "?matchId=" + matchId,
      {headers: new HttpHeaders().set("authToken", environment.authToken) }
    )
    .pipe(
      map(legs => {
        return legs;
      }),
      tap(legs => {
        this.dataService.setLegs(legs);
      })
    );
  }

  fetchPlayers() {
    return this.http
    .get<Player[]>(
      this.proxy + this.baseUrl + "players",
      {headers: new HttpHeaders().set("authToken", environment.authToken) }
    )
    .pipe(
      map(players => {
        return players;
      }),
      tap(players => {
        this.dataService.setPlayers(players);
      })
    );
  }
}
