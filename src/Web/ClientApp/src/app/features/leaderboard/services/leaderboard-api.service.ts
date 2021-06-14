import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedList, Sort } from 'src/app/core';
import { HttpParamsUtils } from 'src/app/core/http-utils';
import { AllianceLeaderBoard, UserLeaderBoard } from 'src/app/domain/entities';
// import { LeaderBoard } from 'src/app/domain/entities';

@Injectable({providedIn: 'any'})
export class LeaderBoardsApiService {
  static readonly URL = '/api/leaderboard';

  constructor(private http: HttpClient) { }

  getAlliancesLeaderBoard(sort?: Sort): Observable<PaginatedList<AllianceLeaderBoard>> {
    const params = HttpParamsUtils.getParams(sort);

    return this.http.get<any[]>(`${LeaderBoardsApiService.URL}/alliances`, {params})
      .pipe(map(x => PaginatedList.fromObject<AllianceLeaderBoard>(x, AllianceLeaderBoard.fromObject)));
  }

  getUsersLeaderBoard(sort?: Sort): Observable<PaginatedList<UserLeaderBoard>> {
    const params = HttpParamsUtils.getParams(sort);

    return this.http.get<any[]>(`${LeaderBoardsApiService.URL}/personal`, {params})
      .pipe(map(x => PaginatedList.fromObject<UserLeaderBoard>(x, UserLeaderBoard.fromObject)));
  }
}
