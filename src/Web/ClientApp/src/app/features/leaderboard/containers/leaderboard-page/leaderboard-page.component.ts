import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Sort } from 'src/app/core';
import { LeaderBoardsService } from '../../services/leaderboard.service';

@Component({
  selector: 'sb-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LeaderBoardsService]
})
export class LeaderboardPageComponent implements OnInit {

  constructor(public service: LeaderBoardsService) { }

  ngOnInit(): void {
  }

  onAllianceDataRequested(sort: Sort) {
    this.service.loadPaginatedAlliancesLeaderBoard(sort);
  }

  onUserDataRequested(sort: Sort) {
    this.service.loadPaginatedUsersLeaderBoard(sort);
  }

}
