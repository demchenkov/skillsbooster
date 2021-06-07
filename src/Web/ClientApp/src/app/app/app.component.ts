import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {
  routeAnimations,
  LocalStorageService,
  TitleService,
} from '../core/core.module';
import {filter, map, switchMap} from "rxjs/operators";
import {AuthorizeService} from "../core/api-authorization/authorize.service";
import { OverlayContainer } from '@angular/cdk/overlay';
import { ActivationEnd, Router } from '@angular/router';
import { ApplicationPaths } from '../core/api-authorization/api-authorization.constants';
import { User } from '../domain/entities';
import { UsersService } from '../features/user/services/user.service';

@Component({
  selector: 'sb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
  providers: [UsersService]
})
export class AppComponent implements OnInit {
  year = new Date().getFullYear();
  logo = '../../assets/logo.svg';

  user$: Observable<User>;

  navigation = [
    { link: 'problems', label: 'Problems', icon: 'splitscreen' },
    { link: 'alliances', label: 'Alliances', icon: 'groups', },
    { link: 'duels', label: 'Duels', icon: 'social_distance',},
    { link: 'leaderboard', label: 'Ranking', icon: 'poll' },
  ];

  navigationSideMenu = [ ...this.navigation ];

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$ = new BehaviorSubject('black-theme');

  constructor(
    private titleService: TitleService,
    private authorizeService: AuthorizeService,
    private overlayContainer: OverlayContainer,
    private router: Router,
    private usersService: UsersService
  ) {
    this.isAuthenticated$ = this.authorizeService.isAuthenticated();
  }

  ngOnInit(): void {
    this.user$ = this.isAuthenticated$.pipe(
      filter(x => x),
      switchMap(() => this.usersService.getMe())
    );
    this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd)
    ).subscribe(() => this.titleService.setTitle(this.router.routerState.snapshot.root))

    this.theme$.subscribe(x => {
      this.overlayContainer.getContainerElement().classList.add(x);
    });
  }

  onLogoutClick() {
    this.router.navigate([`/${ApplicationPaths.LogOut}`], { skipLocationChange: true })
  }
}
