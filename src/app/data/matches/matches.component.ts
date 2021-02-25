import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService } from '../data.service';
import { DataStorageService } from '../data-storage.service';
import { GameService } from 'src/app/game/game.service';
import { Match } from '../match.model';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit, OnDestroy {
  matches: Match[];
  subscription: Subscription;

  actualGameMatchId: string;

  constructor (private dataService: DataService, private dataStorageService: DataStorageService, private gameService: GameService) {}

  ngOnInit(): void {
    this.subscription = this.dataService.matchesChanged
    .subscribe(
      (matches: Match[]) => {
        this.matches = matches;
      }
    );
  this.matches = this.dataService.getMatches();

  this.subscription = this.gameService.matchIdChanged
    .subscribe(
      (matchId: string) => {
        this.actualGameMatchId = matchId;
      }
    );
  this.actualGameMatchId = this.gameService.getMatchId();
  }

  onFetchLegs(matchId: string) {
    this.dataService.setMatchId(matchId);
    this.gameService.setLoadedMatch(true);
    this.gameService.setChangeActualAndLoaded(true);
    this.dataStorageService.fetchLegs(matchId).subscribe();
    this.gameService.setScorePanelActive(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
