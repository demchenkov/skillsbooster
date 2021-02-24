import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  Output,
  EventEmitter,
  Input,
  AfterViewInit
} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {merge} from "rxjs";
import {startWith} from "rxjs/operators";
import { PaginatedList, Sort } from 'src/app/core';
import { Exercise } from '../../entities';

@Component({
  selector: 'sb-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'difficulty', 'score'];

  @Input() data: PaginatedList<Exercise>;
  @Input() isLoadingResults = true;
  @Output() dataRequested = new EventEmitter<Sort>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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

  getLink(row: Exercise): string {
    return `./${row.id}`;
  }
}
