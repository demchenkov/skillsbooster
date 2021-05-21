import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { NgOnDestroy } from 'src/app/core';
import { Challenge } from 'src/app/domain/entities';
import { ExerciseStatus } from 'src/app/domain/enums';
import { ChallengesService } from '../../services/challenges.service';

@Component({
  selector: 'sb-challenge-details-page',
  templateUrl: './challenge-details-page.component.html',
  styleUrls: ['./challenge-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy, ChallengesService]
})
export class ChallengeDetailsPageComponent implements OnInit {
  pageId$: Observable<number>;
  challenge$ = this.service.challenge$;
  loading$ = this.service.loading$;
  tasks$ = this.challenge$.pipe(filter(x => x != null), map(x => x.exercises));
  ranking$ = this.challenge$.pipe(filter(x => x != null), map(x => x.competitors))

  constructor(private route: ActivatedRoute, private service: ChallengesService, private onDestroy$: NgOnDestroy) { }

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

    this.pageId$.pipe(takeUntil(this.onDestroy$)).subscribe(id => this.service.getChallengeById(id));
  }
}
