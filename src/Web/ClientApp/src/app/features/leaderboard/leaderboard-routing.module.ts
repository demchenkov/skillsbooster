import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardPageComponent } from './containers/leaderboard-page/leaderboard-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LeaderboardPageComponent,
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderboardRoutingModule { }
