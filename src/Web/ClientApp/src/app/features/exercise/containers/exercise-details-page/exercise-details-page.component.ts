import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, finalize, map, takeUntil, tap } from 'rxjs/operators';
import { NgOnDestroy, PageIdGetter } from 'src/app/core';
import { SupportedLangNames, SupportedLangs } from 'src/app/core/modules/editor/editor.constants';
import { Submission } from 'src/app/domain/entities';
import { SubmissionsService } from 'src/app/features/submission/services/submission.service';
import { Exercise } from '../../entities';
import { ExercisesService } from '../../services';

@Component({
  selector: 'sb-exercise-details-page',
  templateUrl: './exercise-details-page.component.html',
  providers: [ExercisesService, PageIdGetter, NgOnDestroy, SubmissionsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseDetailsPageComponent implements OnInit {
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

  constructor(private idGetter: PageIdGetter,
              public service: ExercisesService,
              private submissionsService: SubmissionsService,
              private onDestroy$: NgOnDestroy,
              private router: Router,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.pageId$ = this.idGetter.getPageId('number') as Observable<number>;

    combineLatest([this.service.loading$, this.editorLoading$.asObservable()])
      .pipe(
        takeUntil(this.onDestroy$),
        map(([a, b]) => a || b))
      .subscribe(x => this.loading = x);

    this.pageId$.subscribe(id => {
      this.service.getExerciseById(id)
      this.submissionsService.getMySubmissions(id).subscribe(x => this.submissions$.next(x));
    });
  }

  onEditorInit() {
    this.editorLoading$.next(false);
  }

  onSubmit(data: Partial<Submission>) {
    this.loading = true;
    this.submissionsService.submitExercise(data)
      .pipe(finalize(() => this.loading = false))
      .subscribe(id => this.router.navigate(['/submissions', id]));
  }
}
