import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcceptanceListComponent } from './acceptance-list.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';




@NgModule({
  declarations: [AcceptanceListComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatProgressBarModule
  ],
  exports: [AcceptanceListComponent]
})
export class AcceptanceListModule { }
