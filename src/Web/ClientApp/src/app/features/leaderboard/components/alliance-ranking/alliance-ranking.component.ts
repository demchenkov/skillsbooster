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
        title: 'Alliance 1',
        leader: 'Demchenko',
        amountOfWonChallenges: 1
      },
      {
        id: 2,
        rank: 2,
        title: 'Alliance 2',
        leader: 'Demchenko',
        amountOfWonChallenges: 2
      },
      {
        id: 3,
        rank: 3,
        title: 'Alliance 3',
        leader: 'Demchenko',
        amountOfWonChallenges: 3
      },
      {
        id: 4,
        rank: 4,
        title: 'Alliance 4',
        leader: 'Demchenko',
        amountOfWonChallenges: 4
      },
      {
        id: 5,
        rank: 5,
        title: 'Alliance 5',
        leader: 'Demchenko',
        amountOfWonChallenges: 5
      },
      {
        id: 6,
        rank: 6,
        title: 'Alliance 6',
        leader: 'Demchenko',
        amountOfWonChallenges: 6
      },
    ].sort((a, b) => a.rank - b.rank);
  }
}

