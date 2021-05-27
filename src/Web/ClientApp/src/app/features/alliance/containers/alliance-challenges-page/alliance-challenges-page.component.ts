import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { NgOnDestroy } from 'src/app/core';
import { AlliancesService } from '../../services/alliances.service';


@Component({
  selector: 'sb-alliance-challenges-page',
  templateUrl: './alliance-challenges-page.component.html',
  styleUrls: ['./alliance-challenges-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AlliancesService, NgOnDestroy]
})
export class AllianceChallengesPageComponent implements OnInit {
  pageId$: Observable<number>;
  isLoadingResults$ = this.service.loading$;
  items$ = this.service.allianceChallenges$;

  constructor(private route: ActivatedRoute, private router: Router, private service: AlliancesService, private onDestroy$: NgOnDestroy) { }

  ngOnInit(): void {
    this.pageId$ = this.route.paramMap.pipe(
      takeUntil(this.onDestroy$),
      map(x => {
        const id = Number.parseInt(x.get('id'), 10);
        if (Number.isNaN(id)) {
          this.router.navigate(['/', 'error', '404'], { skipLocationChange: true })
        }
        return id;
      })
    );

    this.pageId$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(id => this.service.getAllianceChallenges(id));
  }

  getLink(row: any): string {
    return `/challenges/${row.id}`;
  }
}
