import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedList, Sort } from 'src/app/core';
import { Exercise } from '../entities';

@Injectable()
export class ExercisesApiService {
  static readonly URL = '/api/exercises';

  constructor(private http: HttpClient) { }

  loadPaginatedExercises(sort?: Sort): Observable<PaginatedList<Exercise>> {
    const params = this.getParams(sort);

    return this.http.get(ExercisesApiService.URL, { params }).pipe(
      map(x => PaginatedList.fromObject<Exercise>(x))
    );
  }

  private getParams(data: object) {
    if (data == null) {
      return new HttpParams();
    }

    return Object.entries(data).reduce((query, [key, val]) => query.append(key, val.toString()), new HttpParams());
  }
}
