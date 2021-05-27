import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '404',
    component: NotFoundPageComponent,
  },
  {
    path: '403',
    component: AccessDeniedComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
