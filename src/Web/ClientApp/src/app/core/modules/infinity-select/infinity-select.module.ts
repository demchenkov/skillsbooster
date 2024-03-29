import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfinitySelectComponent } from './infinity-select.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';



@NgModule({
  declarations: [InfinitySelectComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMatSelectSearchModule,
  ],
  exports: [InfinitySelectComponent]
})
export class InfinitySelectModule { }
