import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-dartboard',
  templateUrl: './dartboard.component.html',
  styleUrls: ['./dartboard.component.css']
})
export class DartboardComponent implements OnInit {
/*   @Output() dartsThrow: EventEmitter<number> = new EventEmitter<number>(); */

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  onClick(event: any, sector: number, multiplier: number) {
    let dartsThrowText = event.target.attributes.id.value;
    let dartsThrowScore = sector * multiplier;
    this.gameService.setAddDart(dartsThrowText, dartsThrowScore);
    console.log("Throw text: ", dartsThrowText)
    console.log("Throw score: ", dartsThrowScore)
  }

}
