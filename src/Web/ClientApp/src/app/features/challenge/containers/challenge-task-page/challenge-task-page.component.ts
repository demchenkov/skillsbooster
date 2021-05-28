import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PageIdGetter } from 'src/app/core';
import { SupportedLangNames, SupportedLangs } from 'src/app/core/modules/editor/editor.constants';


@Component({
  selector: 'sb-challenge-task-page',
  templateUrl: './challenge-task-page.component.html',
  styleUrls: ['./challenge-task-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PageIdGetter]
})
export class ChallengeTaskPageComponent implements OnInit {
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
