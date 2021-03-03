import { Directive, ElementRef, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { ThemeService } from "./theme.service";
import { Theme } from "./symbols";

@Directive({
  selector: '[app-theme]'
})
export class ThemeDirective implements OnInit {

  private unsubscribe = new Subject();

  constructor(
    private elementRef: ElementRef,
    private themeService: ThemeService
  ) {}


  ngOnInit() {
    const activeTheme = this.themeService.getActiveTheme();
    if (activeTheme) {
      this.updateTheme(activeTheme);
    }
    this.themeService.themeChanged.pipe(takeUntil(this.unsubscribe))
    .subscribe((theme: Theme) => this.updateTheme(theme));
  }

  updateTheme(theme: Theme) {
    for(const key in theme.properties) {
      this.elementRef.nativeElement.style.setProperty(key, theme.properties[key]);
    }
  }

}
