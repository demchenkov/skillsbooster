import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PaginatedList, Sort } from 'src/app/core';
import { Exercise } from '../entities';
import { ExercisesApiService } from './exercises-api.service';

@Injectable()
export class ExercisesService {
  private loadingSubj$ = new BehaviorSubject<boolean>(true);
  private exerciseSubj$ = new BehaviorSubject<Exercise>(null);
  private exercisesSubj$ = new BehaviorSubject<PaginatedList<Exercise>>(PaginatedList.getEmpty<Exercise>());

  public loading$: Observable<boolean> = this.loadingSubj$.asObservable();
  public exercise$: Observable<Exercise> = this.exerciseSubj$.asObservable();
  public exercises$: Observable<PaginatedList<Exercise>> = this.exercisesSubj$.asObservable();

  constructor(private apiService: ExercisesApiService) {}

  loadPaginatedExercises(sort?: Sort) {
    this.loadingSubj$.next(true);
    this.apiService.loadPaginatedExercises(sort)
      .pipe(
        finalize(() => this.loadingSubj$.next(false))
      )
      .subscribe(data => this.exercisesSubj$.next(data));
  }

  getExerciseById(id: number) {
    this.loadingSubj$.next(true);
    this.apiService.getExerciseById(id)
      .pipe(
        finalize(() => this.loadingSubj$.next(false))
      )
      .subscribe(data => this.exerciseSubj$.next(data));
  }


  updateExercise(exercise: Partial<Exercise>) {
    this.apiService.updateExercise(exercise).subscribe();
  }

}
