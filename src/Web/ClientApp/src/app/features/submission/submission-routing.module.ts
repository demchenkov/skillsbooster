import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmissionDetailsComponent } from './containers/submission-details-page/submission-details-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: SubmissionDetailsComponent,
    data: { title: 'Submission' }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmissionRoutingModule { }
