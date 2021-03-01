import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupportedLangNames, SupportedLangs } from 'src/app/core/modules/editor/editor.constants';
import { Exercise } from '../../entities';
import { ExercisesService } from '../../services';

@Component({
  selector: 'sb-exercise-details-page',
  templateUrl: './exercise-details-page.component.html',
})
export class ExerciseDetailsPageComponent implements OnInit{
  pageId$: Observable<number>;
  exercise$: Observable<Exercise>;
  loading$: Observable<boolean>;


  language = SupportedLangs.js;
  languages = Object.entries(SupportedLangNames).map(([key, val]) => ({id: key, name: val}));

  code = ''

  constructor(private route: ActivatedRoute, private service: ExercisesService) { }

  ngOnInit() {
    this.pageId$ = this.route.paramMap.pipe(map(x => {
      const id = Number.parseInt(x.get('id'), 10);
      if (Number.isNaN(id)) {
        // todo redirect to not found page
      }
      return id;
    }));

    this.loading$ = this.service.loading$;
    this.exercise$ = this.service.exercise$;

    this.pageId$.subscribe(id => this.service.getExerciseById(id));
  }

  onEditorInit() {
    
  }
}
