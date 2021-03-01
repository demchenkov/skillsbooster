import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllianceAdminPageComponent } from './containers/alliance-admin-page/alliance-admin-page.component';
import { AllianceDetailsPageComponent } from './containers/alliance-details-page/alliance-details-page.component';
import { AllianceListPageComponent } from './containers/alliance-list-page/alliance-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: AllianceListPageComponent,
    data: { title: 'Alliances' }
  },
  {
    path: ':id',
    component: AllianceDetailsPageComponent,
    data: { title: 'Alliance' }
  },
  {
    path: ':id/admin',
    component: AllianceAdminPageComponent,
    data: { title: 'Admin Alliance' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllianceRoutingModule { }
