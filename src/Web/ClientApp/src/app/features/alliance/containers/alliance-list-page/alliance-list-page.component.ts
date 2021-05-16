import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, take } from 'rxjs/operators';
import { Sort } from 'src/app/core';
import { EditAllianceModalComponent } from '../../components/edit-alliance-modal/edit-alliance-modal.component';
import { AlliancesService } from '../../services/alliances.service';

@Component({
  selector: 'sb-alliance-list-page',
  templateUrl: './alliance-list-page.component.html',
  styleUrls: ['./alliance-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AlliancesService]
})
export class AllianceListPageComponent implements OnInit {

  constructor(private dialog: MatDialog, public service: AlliancesService) { }

  ngOnInit(): void {
  }

  onDataRequested(sort: Sort) {
    this.service.loadPaginatedAlliances(sort);
  }

  onCreateAlliance() {
    const dialogRef = this.dialog.open(EditAllianceModalComponent);

    dialogRef.afterClosed().pipe(take(1), filter(Boolean)).subscribe(result => {
      this.service.createAlliance(result);
    });
  }



}
