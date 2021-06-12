import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Row {
  id: number;
  title: string;
  rank: number;
  leader: string;
  amountOfWonChallenges: number;
}

@Component({
  selector: 'sb-alliance-ranking',
  templateUrl: './alliance-ranking.component.html',
  styleUrls: ['./alliance-ranking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllianceRankingComponent implements OnInit {
  ranking$ = new BehaviorSubject<Row[]>([]);

  @Input()
  set ranking(rows: Row[]) {
    this.ranking$.next(rows);
  }

  displayedColumns = ['rank', 'title', 'leader', 'amountOfWonChallenges'];

  constructor() { }

  ngOnInit(): void {
    this.ranking = [
      {
        id: 1,
        rank: 1,
        title: 'Amaranth Legion',
        leader: 'Vladyslav	Demchenko',
        amountOfWonChallenges: 10 - 1
      },
      {
        id: 2,
        rank: 2,
        title: 'Black Lotus',
        leader: 'Hildegard Gibbons',
        amountOfWonChallenges: 10 - 2
      },
      {
        id: 3,
        rank: 3,
        title: 'Scarlet Agony',
        leader: 'Nicholas	Hawkins',
        amountOfWonChallenges: 10 - 3
      },
      {
        id: 4,
        rank: 4,
        title: 'Emerald Fury',
        leader: 'Christian	Banks',
        amountOfWonChallenges: 10 - 4
      }
    ].sort((a, b) => a.rank - b.rank);
  }
}
