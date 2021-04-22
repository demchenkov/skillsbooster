import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditAllianceModalComponent } from '../../components/edit-alliance-modal/edit-alliance-modal.component';

enum ChallengeStatus {
  Scheduled,
  Active,
  Passed
} 

@Component({
  selector: 'sb-alliance-challenges-page',
  templateUrl: './alliance-challenges-page.component.html',
  styleUrls: ['./alliance-challenges-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllianceChallengesPageComponent implements OnInit {

  @Input() isLoadingResults = false;
  @Input() items = [
    {id: 1, status: 1, title: 'Challenge 1', startDate: new Date(), finishDate: new Date()},
    {id: 2, status: 2, title: 'Challenge 2', startDate: new Date(), finishDate: new Date()},
    {id: 3, status: 0, title: 'Challenge 3', startDate: new Date(), finishDate: new Date()},
    {id: 4, status: 1, title: 'Challenge 4', startDate: new Date(), finishDate: new Date()},
    {id: 5, status: 2, title: 'Challenge 5', startDate: new Date(), finishDate: new Date()},
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getLink(row: any): string {
    return `/challenges/${row.id}`;
  }


  openDialog() {
    const dialogRef = this.dialog.open(EditAllianceModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
