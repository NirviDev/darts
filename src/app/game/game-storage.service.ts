import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { DataService } from '../data/data.service';
import { Match } from '../data/match.model';
import { Leg } from '../data/leg.model';
import { Player } from '../data/players/player.model';

@Injectable({ providedIn: 'root' })
export class GameStorage {
  baseUrl = 'https://insimu-darts-api.azurewebsites.net/darts_api/';

  constructor(
    private http: HttpClient,
    private dataService: DataService
    ) { }

  createMatch() {

  }
}
