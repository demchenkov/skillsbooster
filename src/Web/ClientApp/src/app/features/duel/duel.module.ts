import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DuelRoutingModule } from './duel-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DuelListPageComponent } from './containers/duel-list-page/duel-list-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AcceptanceListModule } from 'src/app/core/modules/acceptance-list/acceptance-list.module';
import { CreateDuelModalComponent } from './containers/create-duel-modal/create-duel-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfinitySelectModule, UiModalModule } from 'src/app/core/modules';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { ExercisesApiService } from '../exercise/services';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    DuelListPageComponent,
    CreateDuelModalComponent
  ],
  imports: [
    CommonModule,
    DuelRoutingModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    AcceptanceListModule,
    FormsModule,
    ReactiveFormsModule,
    UiModalModule,
    InfinitySelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatDialogModule
  ],
  providers: [ExercisesApiService]
})
export class DuelModule { }
