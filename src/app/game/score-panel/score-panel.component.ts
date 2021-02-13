import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { DataService } from 'src/app/data/data.service';
import { Match } from 'src/app/data/match.model';
import { Leg } from 'src/app/data/leg.model';
import { Throw } from 'src/app/data/throw.model';
import { ScoreService } from './score.service';

@Component({
  selector: 'app-score-panel',
  templateUrl: './score-panel.component.html',
  styleUrls: ['./score-panel.component.css'],
})
export class ScorePanelComponent implements OnInit, OnDestroy{
  @Input() leg: Leg;
  @Input() index: number;
  matches: Match[];
  legs: Leg[];
  player1Id = "";
  player2Id = "";
  throw: Throw[];
  subscription: Subscription;


  legPage = 1;
  legPageSize = 1;

  roundPage = 1;
  roundPageSize = 1;

  constructor(private dataService: DataService, private scoreService: ScoreService) {}

  ngOnInit(): void {
    this.subscription = this.dataService.legsChanged.subscribe(
      (legs: Leg[]) => {
        this.legs = legs;
      }
    );
    this.legs = this.dataService.getLegs();

    this.subscription = this.scoreService.player1IdChanged.subscribe(
      (player1Id: string) => {
        this.player1Id = player1Id;
      }
    );
    this.player1Id = this.scoreService.getPlayer1Id();

    this.subscription = this.scoreService.player2IdChanged.subscribe(
      (player2Id: string) => {
        this.player2Id = player2Id;
      }
    );
    this.player2Id = this.scoreService.getPlayer2Id()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
