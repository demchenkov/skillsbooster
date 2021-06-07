import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filter } from 'src/app/core/models/filter.model';
import { LoadNextPageEvent } from 'src/app/core/modules/infinity-select/infinity-select.component';
import { User } from 'src/app/domain/entities';
import { Exercise } from 'src/app/features/exercise/entities';
import { ExercisesService } from 'src/app/features/exercise/services';
import { UsersService } from 'src/app/features/user/services/user.service';

@Component({
  selector: 'sb-create-duel-modal',
  templateUrl: './create-duel-modal.component.html',
  styleUrls: ['./create-duel-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExercisesService, UsersService]
})
export class CreateDuelModalComponent implements OnInit {
  form: FormGroup;

  exercisePaginatedList$: Observable<Exercise[]> = this.exercisesService.exercises$.pipe(map(x => x.items));
  exercisePageIndex$: Observable<number> = this.exercisesService.exercises$.pipe(map(x => x.pageIndex));
  exerciseHasNextPage$ = this.exercisesService.exercises$.pipe(map(x => x.hasNextPage));
  exerciseSearching$: Observable<boolean> = this.exercisesService.loading$;

  userPaginatedList$: Observable<User[]> = this.usersService.users$.pipe(map(x => x.items));
  userPageIndex$: Observable<number> = this.usersService.users$.pipe(map(x => x.pageIndex));
  userHasNextPage$ = this.usersService.users$.pipe(map(x => x.hasNextPage));
  userSearching$: Observable<boolean> = this.usersService.loading$;

  constructor(
    private fb: FormBuilder,
    private exercisesService: ExercisesService,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<CreateDuelModalComponent>,
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: [, [Validators.required]],
      exercises: [[], [Validators.required]],
      opponentId: [],
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
    this.usersService.getAllUsers(filter);
  }

  onConfirm() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  userNameGetter(user: User) {
    return user.fullName;
  }
}
