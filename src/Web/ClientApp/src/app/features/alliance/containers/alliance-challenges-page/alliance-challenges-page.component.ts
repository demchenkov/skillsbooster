import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgOnDestroy, PageIdGetter } from 'src/app/core';
import { AlliancesService } from '../../services/alliances.service';


@Component({
  selector: 'sb-alliance-challenges-page',
  templateUrl: './alliance-challenges-page.component.html',
  styleUrls: ['./alliance-challenges-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AlliancesService, NgOnDestroy, PageIdGetter]
})
export class AllianceChallengesPageComponent implements OnInit {
  pageId$: Observable<number>;
  isLoadingResults$ = this.service.loading$;
  items$ = this.service.allianceChallenges$;

  constructor(private idGetter: PageIdGetter, private service: AlliancesService, private onDestroy$: NgOnDestroy) { }

  ngOnInit(): void {
    this.pageId$ = this.idGetter.getPageId('number') as Observable<number>;

    this.pageId$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(id => this.service.getAllianceChallenges(id));
  }

  getLink(row: any): string {
    return `/challenges/${row.id}`;
  }
}
