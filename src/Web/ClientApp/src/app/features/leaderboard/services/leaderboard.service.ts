import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Sort } from 'src/app/core';
import { PaginatedList } from 'src/app/core/models/paginated-list.model';
import { AllianceLeaderBoard, UserLeaderBoard } from 'src/app/domain/entities';
import { LeaderBoardsApiService } from './leaderboard-api.service';

@Injectable()
export class LeaderBoardsService {
  private alliancesLoadingSubj$ = new BehaviorSubject<boolean>(true);
  private alliancesSubj$ = new BehaviorSubject<PaginatedList<AllianceLeaderBoard>>(PaginatedList.getEmpty<AllianceLeaderBoard>());

  public alliancesLoading$: Observable<boolean> = this.alliancesLoadingSubj$.asObservable();
  public alliances$: Observable<PaginatedList<AllianceLeaderBoard>> = this.alliancesSubj$.asObservable();


  private usersLoadingSubj$ = new BehaviorSubject<boolean>(true);
  private usersSubj$ = new BehaviorSubject<PaginatedList<UserLeaderBoard>>(PaginatedList.getEmpty<UserLeaderBoard>());

  public usersLoading$: Observable<boolean> = this.usersLoadingSubj$.asObservable();
  public users$: Observable<PaginatedList<UserLeaderBoard>> = this.usersSubj$.asObservable();

  constructor(private apiService: LeaderBoardsApiService) {}

  loadPaginatedAlliancesLeaderBoard(sort?: Sort) {
    this.alliancesLoadingSubj$.next(true);
    this.apiService.getAlliancesLeaderBoard(sort)
      .pipe(
        finalize(() => this.alliancesLoadingSubj$.next(false))
      )
      .subscribe(data => this.alliancesSubj$.next(data));
  }

  loadPaginatedUsersLeaderBoard(sort?: Sort) {
    this.usersLoadingSubj$.next(true);
    this.apiService.getUsersLeaderBoard(sort)
      .pipe(
        finalize(() => this.usersLoadingSubj$.next(false))
      )
      .subscribe(data => this.usersSubj$.next(data));
  }
}
