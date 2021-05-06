import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { ChallengeDetailsPageComponent } from './containers/challenge-details-page/challenge-details-page.component';
import { ChallengeTaskPageComponent } from './containers/challenge-task-page/challenge-task-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: ChallengeDetailsPageComponent,
    data: { title: 'Challenge' }
  },
  {
    path: ':challengeId/tasks/:id',
    component: ChallengeTaskPageComponent,
    data: { title: 'Challenge Task' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengeRoutingModule { }
