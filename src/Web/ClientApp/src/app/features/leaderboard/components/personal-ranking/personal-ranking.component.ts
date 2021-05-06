import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Row {
  id: number;
  rank: number;
  username: string;
  problems: number;
}

@Component({
  selector: 'sb-personal-ranking',
  templateUrl: './personal-ranking.component.html',
  styleUrls: ['./personal-ranking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalRankingComponent implements OnInit {
  ranking$ = new BehaviorSubject<Row[]>([]);
  
  @Input() 
  set ranking(rows: Row[]) {
    this.ranking$.next(rows);
  }

  displayedColumns = ['rank', 'username', 'problems'];
  
  constructor() { }

  ngOnInit(): void {
    this.ranking = [
      {
        id: 1,
        rank: 1,
        username: 'Alliance 1',
        problems: 1
      },
      {
        id: 2,
        rank: 2,
        username: 'Alliance 2',
        problems: 2
      },
      {
        id: 3,
        rank: 3,
        username: 'Alliance 3',
        problems: 3
      },
      {
        id: 4,
        rank: 4,
        username: 'Alliance 4',
        problems: 4
      },
      {
        id: 5,
        rank: 5,
        username: 'Alliance 5',
        problems: 5
      },
      {
        id: 6,
        rank: 6,
        username: 'Alliance 6',
        problems: 6
      },
    ].sort((a, b) => a.rank - b.rank);
  }
}
