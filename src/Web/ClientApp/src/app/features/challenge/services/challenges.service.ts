import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, share } from 'rxjs/operators';
import { Challenge } from 'src/app/domain/entities';
import { ChallengesApiService } from './challenges-api.service';

@Injectable()
export class ChallengesService {
  private loadingSubj$ = new BehaviorSubject<boolean>(true);
  private challengeSubj$ = new BehaviorSubject<Challenge>(null);

  public loading$: Observable<boolean> = this.loadingSubj$.asObservable();
  public challenge$: Observable<Challenge> = this.challengeSubj$.asObservable();

  constructor(private apiService: ChallengesApiService) {}

  getChallengeById(id: number) {
    this.loadingSubj$.next(true);
    this.apiService.getById(id)
      .pipe(
        finalize(() => this.loadingSubj$.next(false))
      )
      .subscribe(data => this.challengeSubj$.next(data));
  }

  createChallenge(challenge: Partial<Challenge>): Observable<Challenge> {
    const observable = this.apiService.createChallenge(challenge).pipe(share());
    observable.subscribe();
    return observable;
  }

  respondChallenge(challengeId: number, accepted: boolean): Observable<void> {
    const observable = this.apiService.respondChallenge(challengeId, accepted).pipe(share());
    observable.subscribe();
    return observable;
  }
}
