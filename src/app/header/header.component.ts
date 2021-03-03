import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ThemeService } from '../shared/themes/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public navCollapsed = true;

  constructor(private appComponent: AppComponent) {}

  ngOnInit(): void {
  }

  onChangeTheme(name: string) {
    this.appComponent.changeTheme(name);
  }

}
