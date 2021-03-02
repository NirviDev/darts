import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { GameService } from '../game.service';

@Component({
  selector: 'app-dartboard',
  templateUrl: './dartboard.component.html',
  styleUrls: ['./dartboard.component.css']
})
export class DartboardComponent implements OnInit {
  subscription: Subscription;

  actualGame: boolean = null;
  changeActualAndLoaded: boolean = null;

  dartsThrowNumber: number = 0;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.subscription = this.gameService.actualGameChanged.subscribe(
      (boolean: boolean) => {
        this.actualGame = boolean;
      }
    );
    this.actualGame = this.gameService.getActualGame();

    this.subscription = this.gameService.changeActualAndLoadedChanged.subscribe(
      (boolean: boolean) => {
        this.changeActualAndLoaded = boolean;
      }
    );
    this.changeActualAndLoaded = this.gameService.getChangeActualAndLoaded();

    this.subscription = this.gameService.dartsThrowNumberChanged.subscribe(
      (dartsThrowNumber: number) => {
        this.dartsThrowNumber = dartsThrowNumber;
      }
    );
    this.dartsThrowNumber = this.gameService.getDartsThrowNumber();
  }

  onClick(event: any, sector: number, multiplier: number) {
    let dartsThrowText = event.target.attributes.id.value;
    let dartsThrowScore = sector * multiplier;

    if(!this.changeActualAndLoaded && this.actualGame && this.dartsThrowNumber < 3) {
      this.gameService.setAddDart(dartsThrowText, dartsThrowScore, multiplier);
      console.log("Darts throw number: ", this.dartsThrowNumber);
    }
  }
}
