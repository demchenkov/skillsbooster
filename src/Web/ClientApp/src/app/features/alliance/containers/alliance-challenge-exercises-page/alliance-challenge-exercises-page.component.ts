import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'sb-alliance-challenge-exercises-page',
  templateUrl: './alliance-challenge-exercises-page.component.html',
  styleUrls: ['./alliance-challenge-exercises-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllianceChallengeExercisesPageComponent implements OnInit {
  @Input() isLoadingResults = true;
  @Input() data = { items: [], totalCount: 0 };
  displayedColumns: string[] = ['id', 'title', 'isPassed', 'acceptance', 'submittedBy'];

  constructor() { }

  ngOnInit(): void {
  }

  getLink(row: any): string {
    return `./${row.id}`;
  }

}
