import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmissionRoutingModule } from './submission-routing.module';
import { SubmissionDetailsComponent } from './containers/submission-details-page/submission-details-page.component';



@NgModule({
  declarations: [SubmissionDetailsComponent],
  imports: [
    CommonModule,
    SubmissionRoutingModule,
  ]
})
export class SubmissionModule { }
