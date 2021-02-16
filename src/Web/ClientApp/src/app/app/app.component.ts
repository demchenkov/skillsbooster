import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import { environment as env } from '../../environments/environment';

import {
  routeAnimations,
  LocalStorageService,
} from '../core/core.module';
import {map} from "rxjs/operators";
import {AuthorizeService} from "../core/api-authorization/authorize.service";

@Component({
  selector: 'sb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  isProd = env.production;
  envName = env.envName;
  version = '';
  year = new Date().getFullYear();
  logo = '';

  navigation = [
    { link: 'about', label: 'sb.menu.about' },
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
    private authorizeService: AuthorizeService,
  ) {
    this.isAuthenticated$ = this.authorizeService.isAuthenticated();
    this.username$ = this.authorizeService.getUser().pipe(map(u => u && u.name));
  }

  ngOnInit(): void {

  }

  onLoginClick() {
    // this.store.dispatch(authLogin());
  }

  onLogoutClick() {
    // this.store.dispatch(authLogout());
  }

  onLanguageSelect({ value: language }) {
    // this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }
}
