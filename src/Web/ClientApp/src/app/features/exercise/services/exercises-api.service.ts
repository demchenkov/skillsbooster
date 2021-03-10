import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedList, Sort } from 'src/app/core';
import { HttpParamsUtils } from 'src/app/core/http-utils';
import { Exercise } from '../entities';

@Injectable()
export class ExercisesApiService {
  static readonly URL = '/api/exercises';

  constructor(private http: HttpClient) { }

  loadPaginatedExercises(sort?: Sort): Observable<PaginatedList<Exercise>> {
    const params = HttpParamsUtils.getParams(sort);

    return this.http.get(ExercisesApiService.URL, { params }).pipe(
      map(x => PaginatedList.fromObject<Exercise>(x))
    );
  }

  getExerciseById(id: number): Observable<Exercise> {
    return this.http.get(`${ExercisesApiService.URL}/${id}`).pipe(
      map(x => Exercise.fromJS(x))
    );
  }

  createExercise(exercise: Partial<Exercise>): Observable<Exercise> {
    return this.http.post(ExercisesApiService.URL, exercise).pipe(
      map(x => Exercise.fromJS(x))
    );
  }

  updateExercise(exercise: Partial<Exercise>): Observable<Exercise> {
    return this.http.put(`${ExercisesApiService.URL}/${exercise.id}`, exercise).pipe(
      map(x => Exercise.fromJS(x))
    );
  }

  deleteExercise(id: number): Observable<void> {
    return this.http.delete(`${ExercisesApiService.URL}/${id}`).pipe(
      map(() => {})
    );
  }
}
