import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Submission } from 'src/app/domain/entities';

@Injectable({providedIn: 'any'})
export class SubmissionsApiService {
  static readonly URL = '/api/submissions';

  constructor(private http: HttpClient) { }

  submitTask(submission: Partial<Submission>) {
    return this.http.post<number>(SubmissionsApiService.URL, submission);
  }
}
