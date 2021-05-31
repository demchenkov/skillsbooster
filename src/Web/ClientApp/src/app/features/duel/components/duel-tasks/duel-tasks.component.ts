import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ExerciseStatus } from 'src/app/domain/enums';

enum TaskStatus {
  NotStarted,
  Failed,
  PartialCompleted,
  Completed,
}

@Component({
  selector: 'sb-duel-tasks',
  templateUrl: './duel-tasks.component.html',
  styleUrls: ['./duel-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DuelTasksComponent implements OnInit {
  @Input() tasks;

  statuses = ExerciseStatus;

  constructor() { }

  ngOnInit(): void {
  }

  getLink(row: any) {
    return `./tasks/${row.id}`;
  }

  getScoreOrDefault(task: any) {
    return task?.score ?? 0;
  }
}
