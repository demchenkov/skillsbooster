import { Component, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Row {
  alliance: {id: number, title: string},
  totalScore: number;
  scoreDict: {[key: number]: number}
}


@Component({
  selector: 'sb-challenge-participants',
  templateUrl: './challenge-participants.component.html',
  styleUrls: ['./challenge-participants.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChallengeParticipantsComponent implements OnInit, OnChanges {
  @Input()
  taskList:{id: number; title: string}[] = [
    {id: 1, title: 'Task 1'},
    {id: 2, title: 'Task 2'},
    {id: 3, title: 'Task 3'},
    {id: 4, title: 'Task 4'},
    {id: 5, title: 'Task 5'},
    {id: 6, title: 'Task 6'},
    {id: 7, title: 'Task 7'},
    {id: 8, title: 'Task 8'},
  ]


  @Input() 
  ranking: Row[] = [
    {
      alliance: {
        id: 1,
        title: 'Alliance 1'
      },
      totalScore: 1100,
      scoreDict: {
        [1]: 200,
        [2]: 200,
        [3]: 200,
        [4]: 200,
        [5]: 200,
        [6]: 200,
      },
    },
    {
      alliance: {
        id: 1,
        title: 'Alliance 2'
      },
      totalScore: 1200,
      scoreDict: {
        [1]: 200,
        [2]: 200,
        [3]: 200,
        [4]: 200,
        [5]: 200,
        [6]: 200,
      },
    },
    {
      alliance: {
        id: 1,
        title: 'Alliance 3'
      },
      totalScore: 1000,
      scoreDict: {
        [1]: 200,
        [2]: 200,
        [3]: 200,
        [4]: 200,
        [5]: 200,
        [6]: 200,
      },
    },
    {
      alliance: {
        id: 1,
        title: 'Alliance 3'
      },
      totalScore: 1000,
      scoreDict: {
        [1]: 200,
        [2]: 200,
        [3]: 200,
        [4]: 200,
        [5]: 200,
        [6]: 200,
      },
    },
    {
      alliance: {
        id: 1,
        title: 'Alliance 3'
      },
      totalScore: 1000,
      scoreDict: {
        [1]: 200,
        [2]: 200,
        [3]: 200,
        [4]: 200,
        [5]: 200,
        [6]: 200,
      },
    },
    {
      alliance: {
        id: 1,
        title: 'Alliance 3'
      },
      totalScore: 1000,
      scoreDict: {
        [1]: 200,
        [2]: 200,
        [3]: 200,
        [4]: 200,
        [5]: 200,
        [6]: 200,
      },
    },
  ]

  ranking$ = new BehaviorSubject<Row[]>([]);

  displayedColumns = ['title', 'total'];
  
  constructor() { }

  ngOnInit(): void {
    this.displayedColumns.push(...this.taskList.map(x => x.title));
    this.ranking$.next([...this.ranking].sort((a, b) => b.totalScore - a.totalScore))
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ranking && !changes.ranking.isFirstChange()) {
      this.ranking$.next([...this.ranking].sort((a, b) => b.totalScore - a.totalScore))
    }
  }
}
