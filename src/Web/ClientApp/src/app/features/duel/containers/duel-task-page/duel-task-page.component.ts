import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SupportedLangNames, SupportedLangs } from 'src/app/core/modules/editor/editor.constants';


@Component({
  selector: 'sb-duel-task-page',
  templateUrl: './duel-task-page.component.html',
  styleUrls: ['./duel-task-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DuelTaskPageComponent implements OnInit {
  pageId$: Observable<number>;
  exercise$: Observable<any>;
  loading$: Observable<boolean>;


  language = SupportedLangs.js;
  languages = Object.entries(SupportedLangNames).map(([key, val]) => ({id: key, name: val}));

  code = '';
  editorLoading$ = new BehaviorSubject<boolean>(true);

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.pageId$ = this.route.paramMap.pipe(map(x => {
      const id = Number.parseInt(x.get('id'), 10);
      if (Number.isNaN(id)) {
        // todo redirect to not found page
      }
      return id;
    }));

    this.loading$ = of(false);
      
    this.exercise$ = of({});

    // this.pageId$.subscribe(id => this.service.getExerciseById(id));
  }

  onEditorInit() {
    setTimeout(() => this.editorLoading$.next(false));
  }

}
