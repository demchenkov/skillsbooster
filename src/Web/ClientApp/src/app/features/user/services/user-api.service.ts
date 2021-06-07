import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedList, Sort } from 'src/app/core';
import { HttpParamsUtils } from 'src/app/core/http-utils';
import { User } from 'src/app/domain/entities';

@Injectable({providedIn: 'any'})
export class UsersApiService {
  static readonly URL = '/api/users';

  constructor(private http: HttpClient) { }

  loadFilteredUsers(sort?: Sort): Observable<PaginatedList<User>> {
    const params = HttpParamsUtils.getParams(sort);

    return this.http.get(UsersApiService.URL, { params }).pipe(
      map(x => PaginatedList.fromObject<User>(x, User.fromObject))
    );
  }

  getMe() {
    return this.http.get<any[]>(`${UsersApiService.URL}/me`).pipe(
      map(x => User.fromObject(x))
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get(`${UsersApiService.URL}/${id}`).pipe(
      map(x => User.fromObject(x))
    );
  }

  submitTask(user: Partial<User>) {
    return this.http.post(UsersApiService.URL, user);
  }
}
