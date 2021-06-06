import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize, share } from 'rxjs/operators';
import { User } from 'src/app/domain/entities';
import { UsersApiService } from './user-api.service';

@Injectable()
export class UsersService {
  loading$ = new BehaviorSubject<boolean>(false);
  user$ = new BehaviorSubject<User>(null);

  constructor(private apiService: UsersApiService) {}

  getAllUsers() {
    // TODO
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
