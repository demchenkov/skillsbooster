import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeDetailsPageComponent } from './containers/challenge-details-page/challenge-details-page.component';
import { ChallengeRoutingModule } from './challenge-routing.module';
import { ChallengeTasksComponent } from './components/challenge-tasks/challenge-tasks.component';
import { ChallengeParticipantsComponent } from './components/challenge-participants/challenge-participants.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { ChallengeDetailsComponent } from './components/challenge-details/challenge-details.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ChallengeTaskPageComponent } from './containers/challenge-task-page/challenge-task-page.component';
import { MarkdownModule } from 'ngx-markdown';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditorModule } from 'src/app/core/modules';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [
    ChallengeDetailsPageComponent, 
    ChallengeTasksComponent, 
    ChallengeParticipantsComponent, 
    ChallengeDetailsComponent, 
    ChallengeTaskPageComponent
  ],
  imports: [
    CommonModule,
    ChallengeRoutingModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatTooltipModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    EditorModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE
    })
  ]
})
export class ChallengeModule { }
