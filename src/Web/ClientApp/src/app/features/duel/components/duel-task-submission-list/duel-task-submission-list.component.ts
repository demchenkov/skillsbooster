import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Submission } from 'src/app/domain/entities';
import { SubmissionStatus } from 'src/app/domain/enums';

@Component({
  selector: 'sb-duel-task-submission-list',
  templateUrl: './duel-task-submission-list.component.html',
  styleUrls: ['./duel-task-submission-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DuelTaskSubmissionListComponent implements OnInit {
  @Input() submissions: Submission[];


  statuses = SubmissionStatus;
  constructor() { }

  ngOnInit(): void {
  }


  getScoreOrDefault(sub: Submission) {
    return sub?.score ?? 0;
  }
}
