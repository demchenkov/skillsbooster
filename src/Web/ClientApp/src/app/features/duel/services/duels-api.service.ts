import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Duel } from 'src/app/domain/entities';

@Injectable({providedIn: 'any'})
export class DuelsApiService {
  static readonly URL = '/api/duels';

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Duel> {
    return this.http.get(`${DuelsApiService.URL}/${id}`).pipe(
      map(x => Duel.fromObject(x))
    );
  }

  createDuel(duel: Partial<Duel>): Observable<Duel> {
    return this.http.post(DuelsApiService.URL, duel).pipe(
      map(x => Duel.fromObject(x))
    );
  }

  respondDuel(duelId: number, accepted: boolean): Observable<void> {
    return this.http.put<void>(`${DuelsApiService.URL}/${duelId}`, {duelId, accepted});
  }
}
