import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, share, take } from 'rxjs/operators';
import { PaginatedList, Sort } from 'src/app/core';
import { Alliance, AllianceChallenge } from 'src/app/domain/entities';
import { AlliancesApiService } from './alliances-api.service';

@Injectable()
export class AlliancesService {
  private loadingSubj$ = new BehaviorSubject<boolean>(true);
  private allianceSubj$ = new BehaviorSubject<Alliance>(null);
  private alliancesSubj$ = new BehaviorSubject<PaginatedList<Alliance>>(PaginatedList.getEmpty<Alliance>());
  private allianceChallengesSubj$ = new BehaviorSubject<AllianceChallenge[]>([]);

  public loading$: Observable<boolean> = this.loadingSubj$.asObservable();
  public alliance$: Observable<Alliance> = this.allianceSubj$.asObservable();
  public alliances$: Observable<PaginatedList<Alliance>> = this.alliancesSubj$.asObservable();
  public allianceChallenges$ = this.allianceChallengesSubj$.asObservable();

  constructor(private apiService: AlliancesApiService) {}

  loadPaginatedAlliances(sort?: Sort) {
    this.loadingSubj$.next(true);
    this.apiService.loadFilteredAlliances(sort)
      .pipe(
        finalize(() => this.loadingSubj$.next(false))
      )
      .subscribe(data => this.alliancesSubj$.next(data));
  }

  getAllianceById(id: number) {
    this.loadingSubj$.next(true);
    this.apiService.getAllianceById(id)
      .pipe(
        finalize(() => this.loadingSubj$.next(false))
      )
      .subscribe(data => this.allianceSubj$.next(data));
  }

  createAlliance(alliance: Partial<Alliance>): Observable<Alliance> {
    const observable = this.apiService.createAlliance(alliance).pipe(share());
    observable.subscribe();
    return observable;
  }

  updateAlliance(id: number, alliance: Partial<Alliance>): Observable<Alliance> {
    const observable = this.apiService.updateAlliance(id, alliance).pipe(share());
    observable.subscribe();
    return observable;
  }

  deleteAlliance(id: number): Observable<void> {
    const observable = this.apiService.deleteAlliance(id).pipe(share());
    observable.subscribe();
    return observable;
  }

  applyAlliance(id: number): Observable<void> {
    const observable = this.apiService.applyAlliance(id).pipe(share());
    observable.subscribe();
    return observable;
  }

  leaveAlliance(id: number): Observable<void> {
    const observable = this.apiService.leaveAlliance(id).pipe(share());
    observable.subscribe();
    return observable;
  }


  getAllianceChallenges(id: number) {
    this.loadingSubj$.next(true);
    this.apiService.getAllianceChallenges(id)
      .pipe(
        finalize(() => this.loadingSubj$.next(false))
      )
      .subscribe(data => this.allianceChallengesSubj$.next(data));
  }

  getAllianceChallengeRequests(id: number) {
    this.loadingSubj$.next(true);
    const observable = this.apiService.getAllianceChallengeRequests(id)
      .pipe(
        finalize(() => this.loadingSubj$.next(false)),
        share(),
        take(1)
      );

    observable.subscribe();
    return observable;
  }

  getAllianceJoinRequests(id: number) {
    this.loadingSubj$.next(true);
    const observable = this.apiService.getAllianceJoinRequests(id)
      .pipe(
        finalize(() => this.loadingSubj$.next(false)),
        share(),
        take(1)
      );

    observable.subscribe();
    return observable;
  }

  respondJoinRequest(allianceId: number, userId: number, accepted: boolean): Observable<void> {
    const observable = this.apiService.respondJoinRequest(allianceId, userId, accepted).pipe(share());
    observable.subscribe();
    return observable;
  }
}
