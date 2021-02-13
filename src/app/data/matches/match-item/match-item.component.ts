import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService } from '../../data.service';
import { DataStorageService } from '../../data-storage.service';
import { Match } from '../../match.model';
import { ScoreService } from 'src/app/game/score-panel/score.service';

@Component({
  selector: 'app-match-item',
  templateUrl: './match-item.component.html',
  styleUrls: ['./match-item.component.css']
})
export class MatchItemComponent implements OnInit, OnDestroy {
  matches: Match[];
  subscription: Subscription;

  constructor (private dataService: DataService, private dataStorageService: DataStorageService, private scoreService: ScoreService) {}

  ngOnInit(): void {
    this.subscription = this.dataService.matchesChanged
    .subscribe(
      (matches: Match[]) => {
        this.matches = matches;
      }
    );
  this.matches = this.dataService.getMatches();
  }

  onFetchLegs(matchId: string, player1Id: string, player2Id: string) {
    this.dataStorageService.fetchLegs(matchId).subscribe();
    this.scoreService.setPlayersId( player1Id, player2Id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
