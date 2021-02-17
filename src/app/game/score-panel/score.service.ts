import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ScoreService {
  scorePanelActiveChanged = new Subject<boolean>();

  private scorePanelActive: boolean;

  setScorePanelActive(boolean: boolean){
    this.scorePanelActive = boolean;
    this.scorePanelActiveChanged.next(this.scorePanelActive);
  }

  getScorePanelActive() {
    return this.scorePanelActive;
  }
}
