import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { NgOnDestroy } from 'src/app/core';
import { SupportedLangNames, SupportedLangs } from 'src/app/core/modules/editor/editor.constants';


@Component({
  selector: 'sb-duel-task-page',
  templateUrl: './duel-task-page.component.html',
  styleUrls: ['./duel-task-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]
})
export class DuelTaskPageComponent implements OnInit {
  pageId$: Observable<number>;
  exercise$: Observable<any>;
  loading$: Observable<boolean>;


  language = SupportedLangs.js;
  languages = Object.entries(SupportedLangNames).map(([key, val]) => ({id: key, name: val}));

  code = '';
  editorLoading$ = new BehaviorSubject<boolean>(true);

  constructor(private route: ActivatedRoute, private router: Router, private onDestroy$: NgOnDestroy) { }

  ngOnInit() {
    this.pageId$ = this.route.paramMap.pipe(
      takeUntil(this.onDestroy$),
      map(x => {
        const id = Number.parseInt(x.get('id'), 10);
        if (Number.isNaN(id)) {
          this.router.navigate(['/', 'error', '404'], { skipLocationChange: true })
        }
        return id;
      }),
      filter(x => !Number.isNaN(x))
    );

    this.loading$ = of(false);

    this.exercise$ = of({});

    // this.pageId$.subscribe(id => this.service.getExerciseById(id));
  }

  onEditorInit() {
    setTimeout(() => this.editorLoading$.next(false));
  }

}
