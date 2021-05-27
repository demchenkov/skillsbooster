import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { NgOnDestroy } from 'src/app/core';
import { Alliance, Alliances } from 'src/app/domain/entities';
import { AllianceUserType } from 'src/app/domain/enums';
import { EditAllianceModalComponent } from '../../components/edit-alliance-modal/edit-alliance-modal.component';
import { AlliancesService } from '../../services/alliances.service';

@Component({
  selector: 'sb-alliance-details-page',
  templateUrl: './alliance-details-page.component.html',
  styleUrls: ['./alliance-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AlliancesService, NgOnDestroy]
})
export class AllianceDetailsPageComponent implements OnInit {
  pageId$: Observable<number>;
  loading$: Observable<boolean> = this.service.loading$;
  allianceDetails$: Observable<Alliance> = this.service.alliance$;
  userTypes = AllianceUserType;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: AlliancesService,
              private onDestroy$: NgOnDestroy,
              private dialog: MatDialog) { }

  ngOnInit(): void {

    this.pageId$ = this.route.paramMap.pipe(
      takeUntil(this.onDestroy$),
      map(x => {
        const id = Number.parseInt(x.get('id'), 10);
        if (Number.isNaN(id)) {
          this.router.navigate(['/', 'error', '404'], { skipLocationChange: true })
        }
        return id;
      }),
      filter(x => !Number.isNaN(x))
    );

    this.pageId$.pipe(takeUntil(this.onDestroy$)).subscribe(id => this.service.getAllianceById(id));
  }

  changePhotoClicked() {

  }

  editAlliance(alliance: Alliance) {
    const dialogRef = this.dialog.open(EditAllianceModalComponent, {data: alliance});

    dialogRef.afterClosed()
      .pipe(take(1), filter(Boolean), switchMap(x => this.service.updateAlliance(alliance.id, x)))
      .subscribe(() => this.service.getAllianceById(alliance.id));
  }

  applyAlliance(allianceId: number) {
    this.service.applyAlliance(allianceId);
  }

  leaveAlliance(allianceId: number) {
    this.service.leaveAlliance(allianceId);
  }

  deleteAlliance(allianceId: number) {
    this.service.deleteAlliance(allianceId);
  }
}
