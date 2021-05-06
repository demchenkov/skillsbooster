import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sb-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderboardPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
