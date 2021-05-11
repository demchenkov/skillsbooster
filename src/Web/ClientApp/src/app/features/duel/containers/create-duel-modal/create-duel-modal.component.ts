import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filter } from 'src/app/core/models/filter.model';
import { LoadNextPageEvent } from 'src/app/core/modules/infinity-select/infinity-select.component';
import { Exercise } from 'src/app/features/exercise/entities';
import { ExercisesService } from 'src/app/features/exercise/services';

@Component({
  selector: 'sb-create-duel-modal',
  templateUrl: './create-duel-modal.component.html',
  styleUrls: ['./create-duel-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExercisesService]
})
export class CreateDuelModalComponent implements OnInit {
  form: FormGroup;

  exercisePaginatedList$: Observable<Exercise[]> = this.exercisesService.exercises$.pipe(map(x => x.items));
  exercisePageIndex$: Observable<number> = this.exercisesService.exercises$.pipe(map(x => x.pageIndex));
  exerciseHasNextPage$ = this.exercisesService.exercises$.pipe(map(x => x.hasNextPage));
  exerciseSearching$: Observable<boolean> = this.exercisesService.loading$;

  userPaginatedList$: Observable<Exercise[]> = this.exercisesService.exercises$.pipe(map(x => x.items));
  userPageIndex$: Observable<number> = this.exercisesService.exercises$.pipe(map(x => x.pageIndex));
  userHasNextPage$ = this.exercisesService.exercises$.pipe(map(x => x.hasNextPage));
  userSearching$: Observable<boolean> = this.exercisesService.loading$;

  constructor(
    private fb: FormBuilder,
    private exercisesService: ExercisesService
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: [, [Validators.required]],
      exercises: [[], [Validators.required]],
      startDate: [new Date()],
      finishDate: [new Date()],
    });
  }

  onExercisesNextPageRequested(event: LoadNextPageEvent) {
    const filter = new Filter('id', event.search, event.page);
    this.exercisesService.loadPaginatedExercises(filter);
  }

  onUserNextPageRequested(event: LoadNextPageEvent) {
    const filter = new Filter('id', event.search, event.page);
    this.exercisesService.loadPaginatedExercises(filter);
  }

  onConfirm() {

  }
}
