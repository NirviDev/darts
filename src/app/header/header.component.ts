import { Component, OnInit } from '@angular/core';
import { Theme } from '../shared/themes/symbols';

import { ThemeService } from '../shared/themes/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public navCollapsed = true;
  public activeTheme: string = "";

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.themeChanged.subscribe(
      (theme: Theme) => {
        this.activeTheme = theme.name;
        console.log(this.activeTheme)
      }
    );
  }

  changeTheme(name: string) {
    this.themeService.setTheme(name);
  }

}
