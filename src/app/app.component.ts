import { Component } from '@angular/core';
import { ThemeService } from './shared/themes/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'darts';

  constructor(private themeService: ThemeService) {}

  changeTheme(name: string) {
    this.themeService.setTheme(name);
    console.log("set theme")
  }

}
