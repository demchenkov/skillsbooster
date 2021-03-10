import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModalComponent } from './ui-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [UiModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [UiModalComponent]
})
export class UiModalModule {
}
