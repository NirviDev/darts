import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService } from '../../data.service';
import { DataStorageService } from '../../data-storage.service';
import { Match } from '../../match.model';

@Component({
  selector: 'app-match-item',
  templateUrl: './match-item.component.html',
  styleUrls: ['./match-item.component.css']
})
export class MatchItemComponent implements OnInit, OnDestroy {
  matches: Match[];
  subscription: Subscription;

  constructor (private dataService: DataService, private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.subscription = this.dataService.matchesChanged
    .subscribe(
      (matches: Match[]) => {
        this.matches = matches;
      }
    );
  this.matches = this.dataService.getMatches();
  }

  onFetchLegs(matchId: string) {
    this.dataStorageService.fetchLegs(matchId).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
