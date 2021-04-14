import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DuelListPageComponent } from './containers/duel-list-page/duel-list-page.component';

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
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuelRoutingModule { }
