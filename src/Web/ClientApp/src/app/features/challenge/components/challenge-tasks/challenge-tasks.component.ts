import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ExerciseStatus } from 'src/app/domain/enums';



@Component({
  selector: 'sb-challenge-tasks',
  templateUrl: './challenge-tasks.component.html',
  styleUrls: ['./challenge-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChallengeTasksComponent implements OnInit {
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
