import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedList, Sort } from 'src/app/core';
import { HttpParamsUtils } from 'src/app/core/http-utils';
import { Alliance, AllianceChallenge, Alliances, ChallengeRequest, JoinRequest } from 'src/app/domain/entities';

@Injectable({providedIn: 'any'})
export class AlliancesApiService {

  static readonly URL = '/api/alliances';

  constructor(private http: HttpClient) { }

  loadFilteredAlliances(sort?: Sort): Observable<PaginatedList<Alliance>> {
    const params = HttpParamsUtils.getParams(sort);

    return this.http.get(AlliancesApiService.URL, { params }).pipe(
      map(x => PaginatedList.fromObject<Alliance>(x, Alliance.fromObject))
    );
  }

  getAllianceById(id: number): Observable<Alliance> {
    return this.http.get(`${AlliancesApiService.URL}/${id}`).pipe(
      map(x => Alliance.fromObject(x))
    );
  }

  createAlliance(alliance: Partial<Alliance>): Observable<Alliance> {
    return this.http.post(AlliancesApiService.URL, alliance).pipe(
      map(x => Alliance.fromObject(x))
    );
  }

  updateAlliance(id: number, alliance: Partial<Alliance>): Observable<Alliance> {
    alliance.id = id;
    return this.http.put(`${AlliancesApiService.URL}/${id}`, alliance).pipe(
      map(x => Alliance.fromObject(x))
    );
  }

  deleteAlliance(id: number): Observable<void> {
    return this.http.delete<void>(`${AlliancesApiService.URL}/${id}`);
  }

  applyAlliance(id: number): Observable<void> {
    return this.http.post<void>(`${AlliancesApiService.URL}/${id}/members`, {});
  }

  leaveAlliance(id: number): Observable<void> {
    return this.http.delete<void>(`${AlliancesApiService.URL}/${id}/members`, {});
  }

  getAllianceChallenges(id: number) {
    return this.http.get<any[]>(`${AlliancesApiService.URL}/${id}/challenges`).pipe(
      map(challenges => challenges.map(x => AllianceChallenge.fromObject(x)))
    );
  }

  getAllianceChallengeRequests(id: number) {
    return this.http.get<any[]>(`${AlliancesApiService.URL}/${id}/challenge-requests`).pipe(
      map(requests => requests.map(x => ChallengeRequest.fromObject(x)))
    );
  }

  getAllianceJoinRequests(id: number) {
    return this.http.get<any[]>(`${AlliancesApiService.URL}/${id}/join-requests`).pipe(
      map(requests => requests.map(x => JoinRequest.fromObject(x)))
    );
  }

  respondJoinRequest(allianceId: number, userId: number, accepted: boolean) {
    return this.http.put<void>(`${AlliancesApiService.URL}/${allianceId}/members`, {accepted, userId});
  }
}
