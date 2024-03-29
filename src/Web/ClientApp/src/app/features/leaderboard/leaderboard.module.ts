import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardPageComponent } from './containers/leaderboard-page/leaderboard-page.component';
import { LeaderboardRoutingModule } from './leaderboard-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { PersonalRankingComponent } from './components/personal-ranking/personal-ranking.component';
import { AllianceRankingComponent } from './components/alliance-ranking/alliance-ranking.component';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [LeaderboardPageComponent, PersonalRankingComponent, AllianceRankingComponent],
  imports: [
    CommonModule,
    LeaderboardRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ]
})
export class LeaderboardModule { }
