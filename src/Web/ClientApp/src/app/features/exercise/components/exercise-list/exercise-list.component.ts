import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  Output,
  EventEmitter,
  Input,
  AfterViewInit,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {merge, Subject} from "rxjs";
import {startWith} from "rxjs/operators";
import { PaginatedList, Sort } from 'src/app/core';
import { Filter } from 'src/app/core/models/filter.model';
import { Difficulty, Exercise } from '../../entities';

@Component({
  selector: 'sb-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'difficulty', 'topic'];
  formGroup: FormGroup;
  private filterRequest$ = new Subject<Filter>()

  @Input() data: PaginatedList<Exercise>;
  @Input() isLoadingResults = true;
  @Input() filteredOptions: string[];
  @Output() dataRequested = new EventEmitter<Sort>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  autocompleteList = [
    'Longest Palindromic Substring',
    'Add Two Numbers',
    'Median of Two Sorted Arrays',
    'Reverse Integer',
    'Wildcard Matching',
  ]

  private difficultyClassesDict = {
    [Difficulty.Easy]: 'badge-info',
    [Difficulty.Normal]: 'badge-success',
    [Difficulty.Hard]: 'badge-warning',
    [Difficulty.Extreme]: 'badge-danger',
  }



  difficulties = Object.values(Difficulty).filter(x => Number.isInteger(x)) as Difficulty[];

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      title: [],
      topic: [],
      difficulty: [null],
    });
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.filterRequest$.subscribe(() => this.paginator.pageIndex = 0)

    merge(this.sort.sortChange, this.paginator.page, this.filterRequest$)
      .pipe(startWith({}))
      .subscribe(() => {
        const sort = Filter.fromObject({
          fieldName: this.sort.active || null,
          order: this.sort.direction,
          pageNumber: this.paginator.pageIndex + 1,
          search: this.formGroup.get('title').value
        });

        sort['difficulty'] = this.formGroup.get('difficulty').value;
        sort['topic'] = this.formGroup.get('topic').value;

        this.dataRequested.emit(sort);
      });
  }

  getLink(row: Exercise): string {
    return `./${row.id}`;
  }

  getDifficultyName(difficulty: Difficulty) {
    return Difficulty[difficulty];
  }

  getDifficultyCssClass(difficulty: Difficulty) {
    return this.difficultyClassesDict[difficulty];
  }

  onFilter() {
    // const filter = new Filter()

    this.filterRequest$.next()
  }
}
