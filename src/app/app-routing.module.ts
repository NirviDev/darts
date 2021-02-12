import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { GameComponent } from './game/game.component';
import { InformationsComponent } from './informations/informations.component';
import { MatchesComponent } from './data/matches/matches.component';
import { PlayersComponent } from './data/players/players.component';
import { AppStartComponent } from './app-start/app-start.component';

const appRoutes: Routes = [
  { path: '', component: AppStartComponent },
  { path: 'game', component: GameComponent },
  { path: 'informations', component: InformationsComponent, children: [
    {path: 'matches', component: MatchesComponent},
    {path: 'players', component: PlayersComponent}
  ]  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
