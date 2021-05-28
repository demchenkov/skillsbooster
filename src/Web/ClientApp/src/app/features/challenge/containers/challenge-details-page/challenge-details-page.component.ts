import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { NgOnDestroy, PageIdGetter } from 'src/app/core';
import { Challenge } from 'src/app/domain/entities';
import { ExerciseStatus } from 'src/app/domain/enums';
import { ChallengesService } from '../../services/challenges.service';

@Component({
  selector: 'sb-challenge-details-page',
  templateUrl: './challenge-details-page.component.html',
  styleUrls: ['./challenge-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy, ChallengesService, PageIdGetter]
})
export class ChallengeDetailsPageComponent implements OnInit {
  pageId$: Observable<number>;
  challenge$ = this.service.challenge$;
  loading$ = this.service.loading$;
  tasks$ = this.challenge$.pipe(filter(x => x != null), map(x => x.exercises));
  ranking$ = this.challenge$.pipe(filter(x => x != null), map(x => x.competitors))

  constructor(private idGetter: PageIdGetter, private service: ChallengesService, private onDestroy$: NgOnDestroy) { }

  ngOnInit(): void {
    this.pageId$ = this.idGetter.getPageId('number') as Observable<number>;


    this.pageId$.pipe(takeUntil(this.onDestroy$)).subscribe(id => this.service.getChallengeById(id));
  }
}
