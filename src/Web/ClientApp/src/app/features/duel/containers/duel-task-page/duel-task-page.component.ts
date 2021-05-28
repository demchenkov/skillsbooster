import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { NgOnDestroy, PageIdGetter } from 'src/app/core';
import { SupportedLangNames, SupportedLangs } from 'src/app/core/modules/editor/editor.constants';


@Component({
  selector: 'sb-duel-task-page',
  templateUrl: './duel-task-page.component.html',
  styleUrls: ['./duel-task-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PageIdGetter]
})
export class DuelTaskPageComponent implements OnInit {
  pageId$: Observable<number>;
  exercise$: Observable<any>;
  loading$: Observable<boolean>;


  language = SupportedLangs.js;
  languages = Object.entries(SupportedLangNames).map(([key, val]) => ({id: key, name: val}));

  code = '';
  editorLoading$ = new BehaviorSubject<boolean>(true);

  constructor(private idGetter: PageIdGetter) { }

  ngOnInit() {
    this.pageId$ = this.idGetter.getPageId('number') as Observable<number>;

    this.loading$ = of(false);

    this.exercise$ = of({});

    // this.pageId$.subscribe(id => this.service.getExerciseById(id));
  }

  onEditorInit() {
    setTimeout(() => this.editorLoading$.next(false));
  }

}
