import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Submission } from 'src/app/domain/entities';

@Injectable({providedIn: 'any'})
export class SubmissionsApiService {
  static readonly URL = '/api/submissions';

  constructor(private http: HttpClient) { }

  getMySubmissions(exerciseId: number) {
    const params = new HttpParams().append('exerciseId', exerciseId)
    return this.http.get<any[]>(`${SubmissionsApiService.URL}/my`, { params }).pipe(
      map(items => items.map(x => Submission.fromObject(x)))
    );
  }

  getSubmissionById(id: number): Observable<Submission> {
    return this.http.get(`${SubmissionsApiService.URL}/${id}`).pipe(
      map(x => Submission.fromObject(x))
    );
  }

  submitTask(submission: Partial<Submission>) {
    return this.http.post(SubmissionsApiService.URL, submission);
  }
}
