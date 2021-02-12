import { Component, OnInit } from '@angular/core';

import { DataStorageService } from '../data/data-storage.service';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css']
})
export class InformationsComponent implements OnInit {

  constructor(
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
  }

  onFetchMatches() {
    this.dataStorageService.fetchMatches().subscribe();
  }

  onFetchPlayers() {
    this.dataStorageService.fetchPlayers().subscribe();
  }

}
