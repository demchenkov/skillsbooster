import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { filter, finalize, map, takeUntil } from 'rxjs/operators';

import { NgOnDestroy, PageIdGetter } from 'src/app/core';
import { SupportedLangNames, SupportedLangs } from 'src/app/core/modules/editor/editor.constants';
import { Exercise, Submission } from 'src/app/domain/entities';
import { ExercisesService } from 'src/app/features/exercise/services';
import { SubmissionsService } from 'src/app/features/submission/services/submission.service';


@Component({
  selector: 'sb-duel-task-page',
  templateUrl: './duel-task-page.component.html',
  styleUrls: ['./duel-task-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExercisesService, PageIdGetter, NgOnDestroy, SubmissionsService],
})
export class DuelTaskPageComponent implements OnInit {
  submissions$ = new Subject<Submission[]>();
  exercise$: Observable<Exercise> = this.service.exercise$;
  loading$ = new Subject<boolean>();
  language = SupportedLangs.js;
  languages = Object.entries(SupportedLangNames).map(([key, val]) => ({id: key, name: val}));



  private pageId$: Observable<number>;
  private editorLoading$ = new BehaviorSubject<boolean>(false);
  private set loading(value: boolean) {
    this.loading$.next(value);
    this.changeDetector.detectChanges();
  };

  private get duelId(): number {
    return Number.parseInt(this.route.snapshot.paramMap.get('duelId'));
  }

  private get exerciseId(): number {
    return Number.parseInt(this.route.snapshot.paramMap.get('id'));
  }

  constructor(private idGetter: PageIdGetter,
              public service: ExercisesService,
              private submissionsService: SubmissionsService,
              private onDestroy$: NgOnDestroy,
              private router: Router,
              private changeDetector: ChangeDetectorRef,
              private route: ActivatedRoute) { }

  ngOnInit() {
    combineLatest([this.service.loading$, this.editorLoading$.asObservable()])
      .pipe(
        takeUntil(this.onDestroy$),
        map(([a, b]) => a || b))
      .subscribe(x => this.loading = x);

    this.service.getExerciseById(this.exerciseId)
    this.submissionsService.getMySubmissions(this.exerciseId, this.duelId)
      .subscribe(x => this.submissions$.next(x));
  }

  onEditorInit() {
    this.editorLoading$.next(false);
  }

  onSubmit(data: Partial<Submission>) {
    this.loading = true;
    data.duelId = this.duelId;
    this.submissionsService.submitExercise(data)
      .pipe(finalize(() => this.loading = false))
      .subscribe(id => this.router.navigate(['/submissions', id]));
  }
}
