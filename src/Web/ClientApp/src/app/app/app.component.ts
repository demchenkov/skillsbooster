import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {
  routeAnimations,
  LocalStorageService,
} from '../core/core.module';
import {map} from "rxjs/operators";
import {AuthorizeService} from "../core/api-authorization/authorize.service";
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'sb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  year = new Date().getFullYear();
  logo = '';

  navigation = [
    { link: 'about', label: 'About' },
    { link: 'problems', label: 'Problems'}
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
    private overlayContainer: OverlayContainer
  ) {
    this.isAuthenticated$ = this.authorizeService.isAuthenticated();
    this.username$ = this.authorizeService.getUser().pipe(map(u => u && u.name));
  }

  ngOnInit(): void {
    this.theme$.subscribe(x => {
      this.overlayContainer.getContainerElement().classList.add(x);
    });
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
