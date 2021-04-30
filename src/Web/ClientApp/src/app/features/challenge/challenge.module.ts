import { NgModule } from '@angular/core';
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




@NgModule({
  declarations: [
    ChallengeDetailsPageComponent, 
    ChallengeTasksComponent, 
    ChallengeParticipantsComponent, 
    ChallengeDetailsComponent
  ],
  imports: [
    CommonModule,
    ChallengeRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class ChallengeModule { }
