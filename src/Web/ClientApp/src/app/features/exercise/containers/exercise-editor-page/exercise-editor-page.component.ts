import { KeyValue } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise, DifficultyDictionary } from '../../entities';
import { ExercisesService } from '../../services';

@Component({
  selector: 'sb-exercise-editor-page',
  templateUrl: './exercise-editor-page.component.html',
})
export class ExerciseEditorPageComponent implements OnInit {
  pageId$: Observable<number>;
  exercise$: Observable<Exercise>;
  loading$: Observable<boolean>;

  difficulties: KeyValue<number, string>[] = DifficultyDictionary;

  constructor(private route: ActivatedRoute, private service: ExercisesService) { }

  ngOnInit(): void {
    this.pageId$ = this.route.paramMap.pipe(map(x => {
      const id = Number.parseInt(x.get('id'), 10);
      if (Number.isNaN(id)) {
        // todo redirect to not found page
      }
      return id;
    }));

    this.loading$ = this.service.loading$;
    this.exercise$ = this.service.exercise$;

    this.pageId$.subscribe(id => this.service.getExerciseById(id));
  }


  saveExercise(exercise: Exercise) {
    this.service.updateExercise(exercise);
  }
}
