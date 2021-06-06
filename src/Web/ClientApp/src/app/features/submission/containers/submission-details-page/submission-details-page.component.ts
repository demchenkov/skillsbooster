import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest, Observable, Subject, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { NgOnDestroy, PageIdGetter } from 'src/app/core';
import { Submission } from 'src/app/domain/entities';
import { SubmissionStatus } from 'src/app/domain/enums';
import { SubmissionsService } from '../../services/submission.service';

@Component({
  selector: 'sb-submission-details',
  templateUrl: './submission-details-page.component.html',
  styleUrls: ['./submission-details-page.component.scss'],
  providers: [PageIdGetter, NgOnDestroy, SubmissionsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmissionDetailsComponent implements OnInit {
  pageId$: Observable<number>;
  submission$ = new Subject<Submission>();
  duration = this.getRandomArbitrary(100, 700);
  memory = this.getRandomArbitrary(5, 60);
  language = 'C#'


  constructor(private idGetter: PageIdGetter,
    public service: SubmissionsService,
    private onDestroy$: NgOnDestroy) { }

  ngOnInit(): void {
    const onSubmissionChecked$ = new Subject<void>();
    this.pageId$ = this.idGetter.getPageId('number') as Observable<number>;

    combineLatest([timer(0, 5000), this.pageId$])
      .pipe(
        takeUntil(this.onDestroy$),
        takeUntil(onSubmissionChecked$),
        switchMap(([_, id]) => this.service.getSubmissionById(id))
      )
      .subscribe(sub => {
        if (sub.status !== SubmissionStatus.NotChecked) {
          onSubmissionChecked$.next();
        }
        this.submission$.next(sub);
      });
  }

  getAcceptanceStyle(sub: Submission) {
    return `--p:${sub.score};`;
  }

  getDurationStyle(sub: Submission, duration: number) {
    return `--p:${100 * duration / 1000};--color:#ffb105`
  }

  getMemoryStyle(sub: Submission, memory: number) {
    return `--p:${100 * memory / 128};--color:#21b2e0`
  }

  private getRandomArbitrary(min: number, max: number) {
    return parseInt(`${Math.random() * (max - min) + min}`);
  }

}
