import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { NgOnDestroy } from 'src/app/core';
import { Alliance, Alliances } from 'src/app/domain/entities';
import { AllianceUserType } from 'src/app/domain/enums';
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

  constructor(private route: ActivatedRoute, private service: AlliancesService, private onDestroy$: NgOnDestroy) { }

  ngOnInit(): void {

    this.pageId$ = this.route.paramMap.pipe(
      takeUntil(this.onDestroy$),
      map(x => {
        const id = Number.parseInt(x.get('id'), 10);
        if (Number.isNaN(id)) {
          // todo redirect to not found page
        }
        return id;
      }));

    this.pageId$.pipe(takeUntil(this.onDestroy$)).subscribe(id => this.service.getAllianceById(id));
  }

  changePhotoClicked() {

  }

  editAlliance(alliance: Alliance) {
    // TODO get value from modal window

    const entity = Alliance.fromObject(alliance);
    this.service.updateAlliance(alliance.id, entity);
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
