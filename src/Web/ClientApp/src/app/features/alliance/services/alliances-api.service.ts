import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedList } from 'src/app/core';
import { HttpParamsUtils } from 'src/app/core/http-utils';
import { Filter } from 'src/app/core/models/filter.model';
import { Alliance, Alliances } from 'src/app/domain/entities';

@Injectable()
export class AlliancesApiService {
  static readonly URL = '/api/alliances';

  constructor(private http: HttpClient) { }

  loadFilteredAlliances(filter?: Filter): Observable<PaginatedList<Alliance>> {
    const params = HttpParamsUtils.getParams(filter);

    return this.http.get(AlliancesApiService.URL, { params }).pipe(
      map(x => PaginatedList.fromObject<Alliance>(x))
    );
  }

  getAllianceById(id: number): Observable<Alliance> {
    return this.http.get(`${AlliancesApiService.URL}/${id}`).pipe(
      map(x => Alliance.fromObject(x))
    );
  }
}
