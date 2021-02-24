import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sb-exercise-details-page',
  templateUrl: './exercise-details-page.component.html',
})
export class ExerciseDetailsPageComponent implements OnInit {
  pageId: Observable<string>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pageId = this.route.paramMap.pipe(map(x => x.get('id')));
  }

}
