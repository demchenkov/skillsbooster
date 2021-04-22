import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filter } from 'src/app/core/models/filter.model';
import { LoadNextPageEvent } from 'src/app/core/modules/infinity-select/infinity-select.component';
import { Alliance } from 'src/app/domain/entities';
import { Exercise } from 'src/app/features/exercise/entities';
import { ExercisesService } from 'src/app/features/exercise/services';
import { AlliancesService } from '../../services/alliances.service';

@Component({
  selector: 'sb-create-challenge-modal',
  templateUrl: './create-challenge-modal.component.html',
  styleUrls: ['./create-challenge-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AlliancesService, ExercisesService]
})
export class CreateChallengeModalComponent implements OnInit {
  form: FormGroup;
  alliancePaginatedList$: Observable<Alliance[]> = this.alliancesService.Alliances$.pipe(map(x => x.items)); 
  allianceSearching$: Observable<boolean> = this.alliancesService.loading$;
  exercisePaginatedList$: Observable<Exercise[]> = this.exercisesService.exercises$.pipe(map(x => x.items)); 
  exercisePageIndex$: Observable<number> = this.exercisesService.exercises$.pipe(map(x => x.pageIndex)); 
  exerciseHasNextPage$ = this.exercisesService.exercises$.pipe(map(x => x.hasNextPage));
  exerciseSearching$: Observable<boolean> = this.exercisesService.loading$;


  constructor(
    private fb: FormBuilder, 
    private alliancesService: AlliancesService,
    private exercisesService: ExercisesService
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: [, [Validators.required]],
      alliances: [[], [Validators.required]],
      exercises: [[], [Validators.required]],
      startDate: [new Date()],
      finishDate: [new Date()],
    });
  }

  onAlliancesNextPageRequested(event: LoadNextPageEvent) {
    const filter = new Filter('id', event.search, event.page);
    this.alliancesService.loadPaginatedAlliances(filter);
  }

  onExercisesNextPageRequested(event: LoadNextPageEvent) {
    const filter = new Filter('id', event.search, event.page);
    this.exercisesService.loadPaginatedExercises(filter);
  }

  onConfirm() {

  }
}
