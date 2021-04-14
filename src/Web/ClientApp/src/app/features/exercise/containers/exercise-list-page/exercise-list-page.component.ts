import { Component, OnInit } from '@angular/core';
import { Sort } from 'src/app/core';
import { ExercisesService } from '../../services/exercises.service';

@Component({
  selector: 'sb-exercise-list-page',
  templateUrl: './exercise-list-page.component.html',
  providers: [ExercisesService]
})
export class ExerciseListPageComponent implements OnInit {

  constructor(public service: ExercisesService) { }

  ngOnInit(): void {
  }

  onDataRequested(sort: Sort) {
    this.service.loadPaginatedExercises(sort);
  }
}
