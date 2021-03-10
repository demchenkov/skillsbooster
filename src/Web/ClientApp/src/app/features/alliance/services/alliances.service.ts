import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PaginatedList, Sort } from 'src/app/core';
import { Filter } from 'src/app/core/models/filter.model';
import { Alliance } from 'src/app/domain/entities';
import { AlliancesApiService } from './alliances-api.service';

@Injectable()
export class AlliancesService {
  private loadingSubj$ = new BehaviorSubject<boolean>(true);
  private allianceSubj$ = new BehaviorSubject<Alliance>(null);
  private alliancesSubj$ = new BehaviorSubject<PaginatedList<Alliance>>(PaginatedList.getEmpty<Alliance>());

  public loading$: Observable<boolean> = this.loadingSubj$.asObservable();
  public Alliance$: Observable<Alliance> = this.allianceSubj$.asObservable();
  public Alliances$: Observable<PaginatedList<Alliance>> = this.alliancesSubj$.asObservable();

  constructor(private apiService: AlliancesApiService) {}

  loadPaginatedAlliances(filter?: Filter) {
    this.loadingSubj$.next(true);
    this.apiService.loadFilteredAlliances(filter)
      .pipe(
        finalize(() => this.loadingSubj$.next(false))
      )
      .subscribe(data => this.alliancesSubj$.next(data));
  }

  getAllianceById(id: number) {
    this.loadingSubj$.next(true);
    this.apiService.getAllianceById(id)
      .pipe(
        finalize(() => this.loadingSubj$.next(false))
      )
      .subscribe(data => this.allianceSubj$.next(data));
  }
}
