import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditAllianceModalComponent } from '../../components/edit-alliance-modal/edit-alliance-modal.component';

@Component({
  selector: 'sb-alliance-challenges-page',
  templateUrl: './alliance-challenges-page.component.html',
  styleUrls: ['./alliance-challenges-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllianceChallengesPageComponent implements OnInit {

  @Input() isLoadingResults = false;
  @Input() data = { items: [], totalCount: 0 };
  displayedColumns: string[] = ['id', 'title', 'isPassed', 'acceptance', 'submittedBy'];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getLink(row: any): string {
    return `./${row.id}`;
  }


  openDialog() {
    const dialogRef = this.dialog.open(EditAllianceModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
