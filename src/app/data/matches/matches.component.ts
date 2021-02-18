import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService } from '../data.service';
import { DataStorageService } from '../data-storage.service';
import { Match } from '../match.model';
import { ScoreService } from 'src/app/game/score-panel/score.service';
import { GameService } from 'src/app/game/game.service';
import { ScorePanelComponent } from 'src/app/game/score-panel/score-panel.component';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit, OnDestroy {
  matches: Match[];
  subscription: Subscription;

  constructor (private dataService: DataService, private dataStorageService: DataStorageService, private gameService: GameService, private scorePanelComponent: ScorePanelComponent) {}

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
    this.dataService.setPlayersId( player1Id, player2Id);
    this.gameService.setLoadedMatch(true);
    this.gameService.setChangeActualAndLoaded(true);
    this.dataStorageService.fetchLegs(matchId).subscribe();
    this.gameService.setScorePanelActive(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
