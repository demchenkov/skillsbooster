import { Injectable, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";

@Injectable()
export class PageIdGetter implements OnDestroy {
  private onDestroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private router: Router) {}


  getPageId(type: 'number' | 'string' = 'number', template: string = 'id') : Observable<string | number>
  {
    const id$ = this.route.paramMap.pipe(
      takeUntil(this.onDestroy$),
      map(x => x.get(template))
    );

    if (type === 'string') {
      return id$;
    }
    else {
      return id$.pipe(
        map(x => {
          const id = Number.parseInt(x, 10);
          if (Number.isNaN(id)) {
            this.router.navigate(['/', 'error', '404'], { skipLocationChange: true })
          }
          return id;
        }),
        filter(x => !Number.isNaN(x))
      );
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
