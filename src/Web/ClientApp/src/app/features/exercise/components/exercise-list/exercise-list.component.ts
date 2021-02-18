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

@Component({
  selector: 'sb-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'difficulty', 'score'];
  // TODO: data type model
  @Input() data: any[] = [];

  @Input() resultsLength = 0;
  @Input() isLoadingResults = true;

  // TODO: create type for event
  @Output() dataRequested = new EventEmitter<{sort: string, order: string, page: number}>()

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(startWith({}))
      .subscribe(() => {
        const a = {
          sort: this.sort.active,
          order: this.sort.direction,
          page: this.paginator.pageIndex
        }
        this.dataRequested.emit(a);
      });
  }
}
