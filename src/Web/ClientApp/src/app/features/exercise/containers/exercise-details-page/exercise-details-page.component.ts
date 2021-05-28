import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { PageIdGetter } from 'src/app/core';
import { SupportedLangNames, SupportedLangs } from 'src/app/core/modules/editor/editor.constants';
import { Exercise } from '../../entities';
import { ExercisesService } from '../../services';

@Component({
  selector: 'sb-exercise-details-page',
  templateUrl: './exercise-details-page.component.html',
  providers: [ExercisesService, PageIdGetter],
})
export class ExerciseDetailsPageComponent implements OnInit {
  pageId$: Observable<number>;
  exercise$: Observable<Exercise>;
  loading$: Observable<boolean>;


  language = SupportedLangs.js;
  languages = Object.entries(SupportedLangNames).map(([key, val]) => ({id: key, name: val}));

  code = '';
  editorLoading$ = new BehaviorSubject<boolean>(true);

  constructor(private idGetter: PageIdGetter, public service: ExercisesService) { }

  ngOnInit() {
    this.pageId$ = this.idGetter.getPageId('number') as Observable<number>;

    this.loading$ = combineLatest([this.service.loading$, this.editorLoading$])
      .pipe(map(([a, b]) => a || b));

    this.exercise$ = this.service.exercise$;

    this.pageId$.subscribe(id => this.service.getExerciseById(id));
  }

  onEditorInit() {
    this.editorLoading$.next(false)
  }
}
