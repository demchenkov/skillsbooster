import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmissionRoutingModule } from './submission-routing.module';
import { SubmissionDetailsComponent } from './containers/submission-details-page/submission-details-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [SubmissionDetailsComponent],
  imports: [
    CommonModule,
    SubmissionRoutingModule,
    MatProgressBarModule
  ]
})
export class SubmissionModule { }
