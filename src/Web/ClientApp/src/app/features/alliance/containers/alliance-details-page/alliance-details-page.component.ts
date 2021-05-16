import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { NgOnDestroy } from 'src/app/core';
import { Alliance, Alliances } from 'src/app/domain/entities';
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
  isAllianceManager$: Observable<boolean>;
  isAllianceParticipant$: Observable<boolean>;
  allianceDetails$: Observable<Alliance> = this.service.alliance$;

  constructor(private route: ActivatedRoute, private service: AlliancesService, private onDestroy$: NgOnDestroy) { }

  ngOnInit(): void {
    this.isAllianceManager$ = new BehaviorSubject(true).asObservable();
    this.isAllianceParticipant$ = new BehaviorSubject(true).asObservable();

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

}
