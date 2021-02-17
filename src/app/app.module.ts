import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GameComponent } from './game/game.component';
import { DataComponent } from './data/data.component';
import { DartboardComponent } from './game/dartboard/dartboard.component';
import { ScorePanelComponent } from './game/score-panel/score-panel.component';
import { MatchesComponent } from './data/matches/matches.component';
import { LegsComponent } from './data/legs/legs.component';
import { PlayersComponent } from './data/players/players.component';
import { InformationsComponent } from './informations/informations.component';
import { PlayerItemComponent } from './data/players/player-item/player-item.component';
import { DataService } from './data/data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppStartComponent } from './app-start/app-start.component';
import { NewGamePanelComponent } from './game/new-game-panel/new-game-panel.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    NgbModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    GameComponent,
    DataComponent,
    DartboardComponent,
    ScorePanelComponent,
    MatchesComponent,
    LegsComponent,
    PlayersComponent,
    InformationsComponent,
    PlayerItemComponent,
    AppStartComponent,
    NewGamePanelComponent
  ],

  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
