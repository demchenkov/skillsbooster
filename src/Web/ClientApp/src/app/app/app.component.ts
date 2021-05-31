import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {
  routeAnimations,
  LocalStorageService,
  TitleService,
} from '../core/core.module';
import {filter, map} from "rxjs/operators";
import {AuthorizeService} from "../core/api-authorization/authorize.service";
import { OverlayContainer } from '@angular/cdk/overlay';
import { ActivationEnd, Router } from '@angular/router';
import { ApplicationPaths } from '../core/api-authorization/api-authorization.constants';

@Component({
  selector: 'sb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  year = new Date().getFullYear();
  logo = '../../assets/logo.svg';

  navigation = [
    { link: 'problems', label: 'Problems', icon: 'splitscreen' },
    { link: 'alliances', label: 'Alliances', icon: 'groups', },
    { link: 'duels/my', label: 'Duels', icon: 'social_distance',},
    { link: 'leaderboard', label: 'Ranking', icon: 'poll' },
  ];

  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'sb.menu.settings' }
  ];

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$ = new BehaviorSubject('black-theme');
  username$: Observable<string>;

  constructor(
    private storageService: LocalStorageService,
    private titleService: TitleService,
    private authorizeService: AuthorizeService,
    private overlayContainer: OverlayContainer,
    private router: Router,
  ) {
    this.isAuthenticated$ = this.authorizeService.isAuthenticated();
    this.username$ = this.authorizeService.getUser().pipe(map(u => u && u.name));
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd)
    ).subscribe(() => this.titleService.setTitle(this.router.routerState.snapshot.root))

    this.theme$.subscribe(x => {
      this.overlayContainer.getContainerElement().classList.add(x);
    });
  }

  onLoginClick() {
    // this.store.dispatch(authLogin());
  }

  onLogoutClick() {
    this.router.navigate([`/${ApplicationPaths.LogOut}`], { skipLocationChange: true })
  }

  onLanguageSelect({ value: language }) {
    // this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }
}
