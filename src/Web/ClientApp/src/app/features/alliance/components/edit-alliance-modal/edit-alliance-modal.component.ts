import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Alliance } from 'src/app/domain/entities';
import { AlliancesService } from '../../services/alliances.service';

@Component({
  selector: 'sb-edit-alliance-modal',
  templateUrl: './edit-alliance-modal.component.html',
  styleUrls: ['./edit-alliance-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAllianceModalComponent implements OnInit {
  form: FormGroup;
  filePath = new BehaviorSubject<string>('');

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditAllianceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Alliance>,
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required],],
      img: [null],
      description: ['',],
    });
  }

  onConfirm() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.form.patchValue({
      img: file
    });

    this.form.get('img').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath.next(reader.result as string);
    }
    reader.readAsDataURL(file)
  }

  get actionName() {
    return this.data ? 'Edit' : 'Create'
  }
}
