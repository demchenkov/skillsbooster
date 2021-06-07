import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize, share } from 'rxjs/operators';
import { PaginatedList, Sort } from 'src/app/core';
import { User } from 'src/app/domain/entities';
import { UsersApiService } from './user-api.service';

@Injectable()
export class UsersService {
  loading$ = new BehaviorSubject<boolean>(false);
  user$ = new BehaviorSubject<User>(null);
  users$ = new BehaviorSubject<PaginatedList<User>>(PaginatedList.getEmpty<User>());

  constructor(private apiService: UsersApiService) {}

  getAllUsers(sort?: Sort) {
    this.loading$.next(true);
    this.apiService.loadFilteredUsers(sort)
      .pipe(
        finalize(() => this.loading$.next(false))
      )
      .subscribe(data => this.users$.next(data));
  }

  getMe() {
    this.loading$.next(true);
    const obs = this.apiService.getMe()
      .pipe(
        share(),
        finalize(() => this.loading$.next(false))
      );
    obs.subscribe(x => this.user$.next(x));
    return obs;
  }

  getUserById(id: number) {
    const obs = this.apiService.getUserById(id)
      .pipe(
        share(),
        finalize(() => this.loading$.next(false))
      );
    obs.subscribe(x => this.user$.next(x));
    return obs;
  }

  updateUser(user: Partial<User>) {
    // TODO
  }
}
