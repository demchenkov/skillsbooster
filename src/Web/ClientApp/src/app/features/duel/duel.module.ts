import { NgModule, SecurityContext } from '@angular/core';
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
import { EditorModule, InfinitySelectModule, UiModalModule } from 'src/app/core/modules';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { ExercisesApiService } from '../exercise/services';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { DuelTasksComponent } from './components/challenge-tasks/duel-tasks.component';
import { DuelDetailsComponent } from './components/duel-details/duel-details.component';
import { DuelParticipantsComponent } from './components/duel-participants/duel-participants.component';
import { DuelDetailsPageComponent } from './containers/duel-details-page/duel-details-page.component';
import { DuelTaskPageComponent } from './containers/duel-task-page/duel-task-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MarkdownModule } from 'ngx-markdown';



@NgModule({
  declarations: [
    DuelListPageComponent,
    CreateDuelModalComponent,
    DuelTasksComponent,
    DuelDetailsComponent,
    DuelParticipantsComponent,
    DuelDetailsPageComponent,
    DuelTaskPageComponent
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
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    EditorModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE
    })
  ],
  providers: [ExercisesApiService]
})
export class DuelModule { }
