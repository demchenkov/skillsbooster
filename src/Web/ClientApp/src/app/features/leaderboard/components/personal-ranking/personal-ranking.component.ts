import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Row {
  id: number;
  rank: number;
  username: string;
  totalScore: number;
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

  displayedColumns = ['rank', 'username', 'totalScore', 'solutions'];

  constructor() { }

  ngOnInit(): void {
    this.ranking = [
      {
        id: 1,
        rank: 1,
        username: 'Vladyslav Demchenko',
        totalScore: 199,
        solutions: 10,
      },
      {
        id: 2,
        rank: 2,
        username: 'Hildegard Gibbons',
        totalScore: 198,
        solutions: 8,
      },
      {
        id: 3,
        rank: 3,
        username: 'Nicholas	Hawkins',
        totalScore: 193,
        solutions: 7,
      },
      {
        id: 4,
        rank: 4,
        username: 'Christian	Banks',
        totalScore: 185,
        solutions: 6,
      },
      {
        id: 5,
        rank: 5,
        username: 'Bernard	Park',
        totalScore: 175,
        solutions: 6,
      }
    ].sort((a, b) => a.rank - b.rank);
  }
}
