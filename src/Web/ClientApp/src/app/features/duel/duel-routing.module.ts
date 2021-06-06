import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuelDetailsPageComponent } from './containers/duel-details-page/duel-details-page.component';

import { DuelListPageComponent } from './containers/duel-list-page/duel-list-page.component';
import { DuelTaskPageComponent } from './containers/duel-task-page/duel-task-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my',
    pathMatch: 'full'
  },
  {
    path: 'my',
    component: DuelListPageComponent,
    data: { title: 'Duels' }
  },
  {
    path: ':id',
    component: DuelDetailsPageComponent,
    data: { title: 'Duel' }
  },
  {
    path: ':duelId/tasks/:id',
    component: DuelTaskPageComponent,
    data: { title: 'Duel Task' }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuelRoutingModule { }
