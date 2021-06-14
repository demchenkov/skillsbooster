import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { NgOnDestroy, PageIdGetter } from 'src/app/core';
import { SupportedLangNames, SupportedLangs } from 'src/app/core/modules/editor/editor.constants';
import { Submission } from 'src/app/domain/entities';
import { Exercise } from 'src/app/features/exercise/entities';
import { ExercisesService } from 'src/app/features/exercise/services';
import { SubmissionsService } from 'src/app/features/submission/services/submission.service';


@Component({
  selector: 'sb-challenge-task-page',
  templateUrl: './challenge-task-page.component.html',
  styleUrls: ['./challenge-task-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PageIdGetter, ExercisesService, SubmissionsService, NgOnDestroy]
})
export class ChallengeTaskPageComponent implements OnInit {
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

  private get challengeId(): number {
    return Number.parseInt(this.route.snapshot.paramMap.get('challengeId'));
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
    this.submissionsService.getMySubmissions(this.exerciseId, null, this.challengeId)
      .subscribe(x => this.submissions$.next(x));
  }

  onEditorInit() {
    this.editorLoading$.next(false);
  }

  onSubmit(data: Partial<Submission>) {
    this.loading = true;
    data.challengeId = this.challengeId;
    this.submissionsService.submitExercise(data)
      .pipe(finalize(() => this.loading = false))
      .subscribe(id => this.router.navigate(['/submissions', id]));
  }
}
