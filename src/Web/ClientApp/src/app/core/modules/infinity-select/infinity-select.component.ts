import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { combineLatest, merge, Observable, Subject } from 'rxjs';
import { debounceTime, mapTo, scan, takeUntil } from 'rxjs/operators';

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

  /** page number */
  private pageNumber$: Observable<number>;
  /** control for the search input value */
  searchCtrl: FormControl = new FormControl();
  /** list of data, filtered by the search keyword, limited to the length accumulated by infinity scrolling */
  filteredBatchedData$: Observable<any[]>;

  
  private destroy$: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit() {
    combineLatest([this.searchCtrl.valueChanges, this.infiniteScrollSelect.openedChange])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([_, opened]) => {
        console.log('changes')
        if (opened) {
          this.resetPageNumber$.next();
        }
      });
    this.searchCtrl.patchValue('');

    const doIncrement$ = merge(
      this.incrementPageNumber$.pipe(mapTo(true)),
      this.resetPageNumber$.pipe(mapTo(false))
    );

    this.pageNumber$ = doIncrement$.pipe(
      scan((pageNumber, doIncrement) => {
        return doIncrement ? pageNumber + 1 : 0;
      }, 0),
    );

    this.pageNumber$
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(this.debounceTime)
      )
      .subscribe((page) => {
        const search = this.searchCtrl.value;
        this.nextPageRequested.emit({search, page, pageSize: this.batchSize});
      });

    this.filteredBatchedData$ = combineLatest([this.pageNumber$, this.filteredData$])
      .pipe(scan((arr, [doIncrement, data]) => {
        if (doIncrement) {
          arr.push(...data);
          return arr;
        }
        return [...data]
      }, []));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  getNextBatch(): void {
    this.incrementPageNumber$.next();
  }
}
