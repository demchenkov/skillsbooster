import { Component, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

interface Row {
  alliance: {id: number, title: string},
  totalScore: number;
  exerciseScore: Record<number, number>
}


@Component({
  selector: 'sb-challenge-participants',
  templateUrl: './challenge-participants.component.html',
  styleUrls: ['./challenge-participants.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChallengeParticipantsComponent {
  alwaysVisibleColumns = ['title', 'total'];

  ranking$ = new BehaviorSubject<Row[]>([]);
  taskColumns$ = new BehaviorSubject<{id: number; title: string}[]>([]);
  displayedColumns$ = this.taskColumns$.pipe(map(x => [...this.alwaysVisibleColumns, ...x.map(i => i.title)]));

  @Input() set taskList(taskList: {id: number; title: string}[]) {
    const values = taskList ?? [];
    this.taskColumns$.next([...values]);
  }
  @Input() set ranking(value: Row[]) {
    const values = value ?? [];

    this.ranking$.next([...values].sort((a, b) => b.totalScore - a.totalScore))
  }
}
