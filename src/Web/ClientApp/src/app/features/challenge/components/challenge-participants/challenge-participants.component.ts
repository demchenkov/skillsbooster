import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sb-challenge-participants',
  templateUrl: './challenge-participants.component.html',
  styleUrls: ['./challenge-participants.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChallengeParticipantsComponent implements OnInit {
  data = {
    tasksList: [
      {id: 1, title: 'Task 1'},
      {id: 2, title: 'Task 2'},
      {id: 3, title: 'Task 3'},
      {id: 4, title: 'Task 4'},
      {id: 5, title: 'Task 5'},
      {id: 6, title: 'Task 6'},
      {id: 7, title: 'Task 7'},
      {id: 8, title: 'Task 8'},
      {id: 9, title: 'Task 9'},
      {id: 10, title: 'Task 10'},
      {id: 11, title: 'Task 11'},
    ],
    alliances: [
      {
        alliance: {
          id: 1,
          title: 'Alliance 1'
        },
        scoreDict: {
          [1]: 200,
          [2]: 200,
          [3]: 200,
          [4]: 200,
          [5]: 200,
          [6]: 200,
        },
      }
    ]
  }

  displayedColumns = ['title'];
  
  constructor() { }

  ngOnInit(): void {
    this.displayedColumns.push(...this.data.tasksList.map(x => x.title));
  }

}
