import { Component, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/domain/entities';

interface Row {
  user: User
  exerciseScore: Record<number, number>
  totalScore: number
}


@Component({
  selector: 'sb-duel-participants',
  templateUrl: './duel-participants.component.html',
  styleUrls: ['./duel-participants.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DuelParticipantsComponent {
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
