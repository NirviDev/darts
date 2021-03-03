import { Injectable, Inject, EventEmitter } from '@angular/core';
import { THEMES, ACTIVE_THEME, Theme } from './symbols';

@Injectable()
export class ThemeService {

  themeChanged = new EventEmitter<Theme>();

  constructor(
    @Inject(THEMES) public themes: Theme[],
    @Inject(ACTIVE_THEME) public theme: string
  ) {}

  getActiveTheme() {
    const theme = this.themes.find(t => t.name === this.theme);
    return theme;
  }

  setTheme(name: string) {
    this.theme = name;
    this.themeChanged.emit(this.getActiveTheme());
  }

}
