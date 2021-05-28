import { KeyValue } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { NgOnDestroy, PageIdGetter } from 'src/app/core';
import { Exercise, DifficultyDictionary } from '../../entities';
import { ExercisesService } from '../../services';

@Component({
  selector: 'sb-exercise-editor-page',
  templateUrl: './exercise-editor-page.component.html',
  providers: [ExercisesService, NgOnDestroy]
})
export class ExerciseEditorPageComponent implements OnInit {
  pageId$: Observable<number>;
  exercise$: Observable<Exercise>;
  loading$: Observable<boolean>;

  difficulties: KeyValue<number, string>[] = DifficultyDictionary;

  constructor(private idGetter: PageIdGetter, private service: ExercisesService, private router: Router) { }

  ngOnInit(): void {
    this.pageId$ = this.idGetter.getPageId('number') as Observable<number>;

    this.loading$ = this.service.loading$;
    this.exercise$ = this.service.exercise$;

    this.pageId$.subscribe(id => this.service.getExerciseById(id));
  }


  saveExercise(exercise: Exercise) {
    this.service.updateExercise(exercise)
      .subscribe(x => this.router.navigate(['problems', x.id]));
  }
}
