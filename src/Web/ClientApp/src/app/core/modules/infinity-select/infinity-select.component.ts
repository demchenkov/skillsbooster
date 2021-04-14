import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { combineLatest, merge, Observable, Subject } from 'rxjs';
import { debounceTime, map, mapTo, scan, switchMap, takeUntil } from 'rxjs/operators';

export interface LoadNextPageEvent {
  search: string;
  page: number;
  pageSize: number;
}


@Component({
  selector: 'sb-infinity-select',
  templateUrl: './infinity-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfinitySelectComponent implements OnInit {
  /** control for the selected entity */
  @Input() selectCtrl: FormControl;
  /** list of data corresponding to the search input */
  @Input() filteredData$: Observable<any[]>;

  @Input() loading: boolean;
  
  @Input() multiple = false;
  @Input() currentPageIndex = 0;
  @Input() hasNextPage = true;
  
  @Input() valueGetter: (entity: any) => any = (entity) => entity.id;
  @Input() textGetter: (entity: any) => any = (entity) => entity.title;
  /** number of items added per batch */
  @Input() batchSize = 20;
  @Input() selectPlaceholder = 'Select Something'
  @Input() searchPlaceholder = 'Search';
  @Input() noEntriesFoundLabel = 'No entry matches'
  @Input() debounceTime = 1000;

  @Output() nextPageRequested = new EventEmitter<LoadNextPageEvent>();


  @ViewChild('matSelectInfiniteScroll', { static: true } )
  private infiniteScrollSelect: MatSelect;

  private incrementPageNumber$: Subject<void> = new Subject<void>();
  private resetPageNumber$: Subject<void> = new Subject<void>();
  private accumulatedData$: Observable<any[]>;

  /** page number */
  private pageNumber$: Observable<number>;
  /** control for the search input value */
  searchCtrl: FormControl = new FormControl();
  /** list of data, filtered by the search keyword, limited to the length accumulated by infinity scrolling */
  displayedData$: Observable<any[]>;

  
  private destroy$: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit() {
    this.accumulatedData$ = this.filteredData$.pipe(
      scan((acc, arr) => {
        arr.forEach(x => acc.set(this.valueGetter(x), x));
        return acc;
      }, new Map<any, any>()),
      map(x => [...x.values()])
    );

    const a = this.searchCtrl.valueChanges.pipe(debounceTime(this.debounceTime));

    combineLatest([a, this.infiniteScrollSelect.openedChange])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([_, opened]) => {
        if (opened) {
          this.resetPageNumber$.next();
        }
      });
    this.searchCtrl.patchValue('');

    const doIncrement$ = merge(
      this.incrementPageNumber$.pipe(mapTo(true)),
      this.resetPageNumber$.pipe(mapTo(false))
    ).pipe(takeUntil(this.destroy$));
  

    doIncrement$
      .subscribe(doIncrement => {
        const search = this.searchCtrl.value;
        if (this.hasNextPage || !doIncrement) {
          const page = this.hasNextPage && doIncrement ? this.currentPageIndex + 1 : 0;
          this.nextPageRequested.emit({search, page, pageSize: this.batchSize});
        }
      });
    
    const filteredData$ = merge(
      doIncrement$.pipe(map(doIncrement => !doIncrement ? null : [])), // if equals zero reset, else skip
      this.filteredData$
    )
      .pipe(scan((arr, state) => state === null ? [] : arr.concat(state), []));

    const selectedData$ = combineLatest([this.selectCtrl.valueChanges as Observable<any[]>, this.accumulatedData$])
      .pipe(
        map(([selectedItems, acc]) => acc.filter(x => selectedItems.includes(this.valueGetter(x)))),
        takeUntil(this.destroy$));
    
    // this.displayedData$ = this.infiniteScrollSelect.openedChange
    //   .pipe(
    //     switchMap(opened => opened ? filteredData$ : selectedData$),
    //     takeUntil(this.destroy$)
    //   )
    this.displayedData$ = filteredData$;
    
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  getNextBatch(): void {
    this.incrementPageNumber$.next();
  }
}
