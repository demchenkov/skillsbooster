import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { ChallengeDetailsPageComponent } from './containers/challenge-details-page/challenge-details-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: ChallengeDetailsPageComponent,
    data: { title: 'Challenge' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengeRoutingModule { }
