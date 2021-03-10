import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditAllianceModalComponent } from '../../components/edit-alliance-modal/edit-alliance-modal.component';

@Component({
  selector: 'sb-alliance-list-page',
  templateUrl: './alliance-list-page.component.html',
  styleUrls: ['./alliance-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllianceListPageComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditAllianceModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
