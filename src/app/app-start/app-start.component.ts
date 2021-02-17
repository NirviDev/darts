import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../data/data-storage.service';

@Component({
  selector: 'app-app-start',
  templateUrl: './app-start.component.html',
  styleUrls: ['./app-start.component.css']
})
export class AppStartComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

}
