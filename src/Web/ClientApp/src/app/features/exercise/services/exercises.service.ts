import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PaginatedList, Sort } from 'src/app/core';
import { Exercise } from '../entities';
import { ExercisesApiService } from './exercises-api.service';

@Injectable()
export class ExercisesService {
  private exercisesSubj$ = new BehaviorSubject<PaginatedList<Exercise>>(PaginatedList.getEmpty<Exercise>());
  private loadingSubj$ = new BehaviorSubject<boolean>(true);

  exercises$: Observable<PaginatedList<Exercise>> = this.exercisesSubj$.asObservable();
  loading$: Observable<boolean> = this.loadingSubj$.asObservable();

  constructor(private apiService: ExercisesApiService) {}

  loadPaginatedExercises(sort?: Sort) {
    this.loadingSubj$.next(true);
    this.apiService.loadPaginatedExercises(sort)
      .pipe(
        finalize(() => this.loadingSubj$.next(false))
      )
      .subscribe(data => this.exercisesSubj$.next(data));
  }

}
