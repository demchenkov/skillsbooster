import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Filter } from 'src/app/core/models/filter.model';
import { LoadNextPageEvent } from 'src/app/core/modules/infinity-select/infinity-select.component';
import { Alliance, Alliances } from 'src/app/domain/entities';
import { AlliancesService } from '../../services/alliances.service';

@Component({
  selector: 'sb-edit-alliance-modal',
  templateUrl: './edit-alliance-modal.component.html',
  styleUrls: ['./edit-alliance-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAllianceModalComponent implements OnInit {
  form: FormGroup;
  alliancePaginatedList$: Observable<Alliance[]> = this.service.Alliances$.pipe(map(x => x.items)); 
  allianceSearching$: Observable<boolean> = this.service.loading$;


  constructor(private fb: FormBuilder, private service: AlliancesService) { }

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
    const filter = new Filter('title', event.search, event.page);
    // this.service.loadPaginatedAlliances(filter);
  }

  onConfirm() {

  }
}
