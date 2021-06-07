import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, share } from 'rxjs/operators';
import { Duel } from 'src/app/domain/entities';
import { DuelsApiService } from './duels-api.service';

@Injectable()
export class DuelsService {
  private loadingSubj$ = new BehaviorSubject<boolean>(true);
  private duelSubj$ = new BehaviorSubject<Duel>(null);

  public loading$: Observable<boolean> = this.loadingSubj$.asObservable();
  public duel$: Observable<Duel> = this.duelSubj$.asObservable();

  constructor(private apiService: DuelsApiService) {}

  getActiveMyDuels(): Observable<Duel[]> {
    this.loadingSubj$.next(true);
    const obs = this.apiService.getActiveMyDuels()
      .pipe(share());
    obs.subscribe();
    return obs;
  }

  getMyRequestedDuels(): Observable<Duel[]> {
    this.loadingSubj$.next(true);
    const obs = this.apiService.getMyRequestedDuels()
      .pipe(share());
    obs.subscribe();
    return obs;
  }

  getDuelById(id: number) {
    this.loadingSubj$.next(true);
    this.apiService.getById(id)
      .pipe(
        finalize(() => this.loadingSubj$.next(false))
      )
      .subscribe(data => this.duelSubj$.next(data));
  }

  createDuel(duel: Partial<Duel>): Observable<Duel> {
    const observable = this.apiService.createDuel(duel).pipe(share());
    observable.subscribe();
    return observable;
  }

  respondDuel(duelId: number, accepted: boolean): Observable<void> {
    const observable = this.apiService.respondDuel(duelId, accepted).pipe(share());
    observable.subscribe();
    return observable;
  }
}
