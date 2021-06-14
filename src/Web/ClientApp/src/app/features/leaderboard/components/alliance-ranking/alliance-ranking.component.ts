import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, merge } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { PaginatedList, Sort } from 'src/app/core';
import { AllianceLeaderBoard } from 'src/app/domain/entities';

@Component({
  selector: 'sb-alliance-ranking',
  templateUrl: './alliance-ranking.component.html',
  styleUrls: ['./alliance-ranking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllianceRankingComponent implements AfterViewInit {
  @Input() loading = true;
  @Input() ranking: PaginatedList<AllianceLeaderBoard>;
  @Output() dataRequested = new EventEmitter<Sort>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['rank', 'title', 'leader', 'totalScore'];

  constructor() { }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(startWith({}))
      .subscribe(() => {
        const sort = Sort.fromObject({
          fieldName: this.sort.active || null,
          order: this.sort.direction,
          pageNumber: this.paginator.pageIndex + 1,
        });

        this.dataRequested.emit(sort);
      });
  }
}
