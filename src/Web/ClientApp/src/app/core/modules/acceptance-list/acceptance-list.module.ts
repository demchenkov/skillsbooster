import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcceptanceListComponent } from './acceptance-list.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { EmptyDataModule } from '../empty-data/empty-data.module';




@NgModule({
  declarations: [AcceptanceListComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatProgressBarModule,
    EmptyDataModule
  ],
  exports: [AcceptanceListComponent]
})
export class AcceptanceListModule { }
