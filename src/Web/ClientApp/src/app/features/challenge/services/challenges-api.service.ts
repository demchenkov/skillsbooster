import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Challenge } from 'src/app/domain/entities';

@Injectable({providedIn: 'any'})
export class ChallengesApiService {
  static readonly URL = '/api/challenges';

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Challenge> {
    return this.http.get(`${ChallengesApiService.URL}/${id}`).pipe(
      map(x => Challenge.fromObject(x))
    );
  }

  createChallenge(challenge: Partial<Challenge>): Observable<Challenge> {
    return this.http.post(ChallengesApiService.URL, challenge).pipe(
      map(x => Challenge.fromObject(x))
    );
  }

  respondChallenge(challengeId: number, accepted: boolean): Observable<void> {
    return this.http.put<void>(`${ChallengesApiService.URL}/${challengeId}`, {challengeId, accepted});
  }
}
