import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Submission } from 'src/app/domain/entities';
import { SubmissionStatus } from 'src/app/domain/enums';

@Component({
  selector: 'sb-challenge-submission-list',
  templateUrl: './challenge-submission-list.component.html',
  styleUrls: ['./challenge-submission-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChallengeSubmissionListComponent implements OnInit {
  @Input() submissions: Submission[];


  statuses = SubmissionStatus;
  constructor() { }

  ngOnInit(): void {
  }


  getScoreOrDefault(sub: Submission) {
    return sub?.score ?? 0;
  }
}
