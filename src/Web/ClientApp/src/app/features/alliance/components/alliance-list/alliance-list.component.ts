import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { PaginatedList, Sort } from 'src/app/core';
import { Alliance } from 'src/app/domain/entities';

@Component({
  selector: 'sb-alliance-list',
  templateUrl: './alliance-list.component.html',
  styleUrls: ['./alliance-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllianceListComponent implements OnInit {
  displayedColumns = ['id', 'title', 'leader', 'rating'];

  @Input() data: PaginatedList<Alliance>;
  @Input() isLoadingResults = true;
  @Input() filteredOptions: string[];
  @Output() dataRequested = new EventEmitter<Sort>();
  @Output() createAlliance = new EventEmitter<void>();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(startWith({}))
      .subscribe(() => {
        const sort = Sort.fromObject({
          fieldName: this.sort.active || null,
          order: this.sort.direction,
          pageNumber: this.paginator.pageIndex + 1
        });

        this.dataRequested.emit(sort);
      });
  }

}
