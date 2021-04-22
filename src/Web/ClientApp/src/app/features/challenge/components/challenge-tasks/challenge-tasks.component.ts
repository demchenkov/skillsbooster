import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

enum TaskStatus {
  NotStarted,
  Failed,
  PartialCompleted,
  Completed,
}

@Component({
  selector: 'sb-challenge-tasks',
  templateUrl: './challenge-tasks.component.html',
  styleUrls: ['./challenge-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChallengeTasksComponent implements OnInit {
  @Input() tasks = [
    {
      title: 'Task 1',
      score: 95,
      submittedBy: 'Demchenko V',
      status: TaskStatus.PartialCompleted
    },
    {
      title: 'Task 2',
      score: 0,
      submittedBy: 'Demchenko V',
      status: TaskStatus.Failed
    },
    {
      title: 'Task 3',
      score: 0,
      submittedBy: null,
      status: TaskStatus.NotStarted
    },
    {
      title: 'Task 4',
      score: 100,
      submittedBy: 'Demchenko V',
      status: TaskStatus.Completed
    },
  ]
  
  statuses = TaskStatus;
  
  constructor() { }

  ngOnInit(): void {
  }

  getLink(row: any) {
    return ''
  }

}
