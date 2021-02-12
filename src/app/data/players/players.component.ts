import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Player } from '../players/player.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit, OnDestroy {
  players: Player[];
  subscription: Subscription;

  constructor (private dataService: DataService) {}

  ngOnInit(): void {
    this.subscription = this.dataService.playersChanged
    .subscribe(
      (players: Player[]) => {
        this.players = players;
      }
    );
  this.players = this.dataService.getPlayers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
