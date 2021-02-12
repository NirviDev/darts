import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { DataService } from 'src/app/data/data.service';
import { Leg } from 'src/app/data/leg.model';
import { Throw } from 'src/app/data/throw.model';

@Component({
  selector: 'app-score-panel',
  templateUrl: './score-panel.component.html',
  styleUrls: ['./score-panel.component.css'],
})
export class ScorePanelComponent implements OnInit, OnDestroy{
  @Input() leg: Leg;
  @Input() index: number;
  legs: Leg[];
  throw: Throw[];
  subscription: Subscription;

  legPage = 1;
  legPageSize = 1;

  roundPage = 1;
  roundPageSize = 1;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.subscription = this.dataService.legsChanged.subscribe(
      (legs: Leg[]) => {
        this.legs = legs;
      }
    );
    this.legs = this.dataService.getLegs();
    console.log(this.legs);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
