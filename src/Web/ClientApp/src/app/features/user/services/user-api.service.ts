import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/domain/entities';

@Injectable({providedIn: 'any'})
export class UsersApiService {
  static readonly URL = '/api/users';

  constructor(private http: HttpClient) { }

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
