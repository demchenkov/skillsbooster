import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { NgOnDestroy, PageIdGetter } from 'src/app/core';
import { DuelsService } from '../../services/duels.service';

@Component({
  selector: 'sb-duel-details-page',
  templateUrl: './duel-details-page.component.html',
  styleUrls: ['./duel-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy, DuelsService, PageIdGetter]
})
export class DuelDetailsPageComponent implements OnInit {
  pageId$: Observable<number>;
  duel$ = this.service.duel$.pipe(filter(x => x != null));
  loading$ = this.service.loading$;
  tasks$ = this.duel$.pipe(filter(x => x != null), map(x => x.exercises));
  ranking$ = this.duel$.pipe(filter(x => x != null), map(x => x.competitors))

  constructor(private idGetter: PageIdGetter, private service: DuelsService, private onDestroy$: NgOnDestroy) { }

  ngOnInit(): void {
    this.pageId$ = this.idGetter.getPageId('number') as Observable<number>;


    this.pageId$.pipe(takeUntil(this.onDestroy$)).subscribe(id => this.service.getDuelById(id));
  }
}
