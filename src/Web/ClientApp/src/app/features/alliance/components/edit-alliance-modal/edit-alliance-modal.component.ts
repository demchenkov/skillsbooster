import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alliance } from 'src/app/domain/entities';
import { AlliancesService } from '../../services/alliances.service';

@Component({
  selector: 'sb-edit-alliance-modal',
  templateUrl: './edit-alliance-modal.component.html',
  styleUrls: ['./edit-alliance-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AlliancesService]
})
export class EditAllianceModalComponent implements OnInit {
  form: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: Partial<Alliance>,
    private alliancesService: AlliancesService,
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required],],
      description: ['',],
    });
  }

  onConfirm() {

  }

  get actionName() {
    return this.data ? 'Edit' : 'Create' 
  }
}
