import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllianceRoutingModule } from './alliance-routing.module';
import { AllianceDetailsPageComponent } from './containers/alliance-details-page/alliance-details-page.component';
import { AllianceAdminPageComponent } from './containers/alliance-admin-page/alliance-admin-page.component';
import { AllianceListPageComponent } from './containers/alliance-list-page/alliance-list-page.component';
import { EditAllianceModalComponent } from './components/edit-alliance-modal/edit-alliance-modal.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { InfinitySelectModule, UiModalModule } from 'src/app/core/modules';
import { AlliancesApiService } from './services/alliances-api.service';
import { AlliancesService } from './services/alliances.service';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { AllianceChallengesPageComponent } from './containers/alliance-challenges-page/alliance-challenges-page.component';
import { AllianceChallengeExercisesPageComponent } from './containers/alliance-challenge-exercises-page/alliance-challenge-exercises-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    AllianceListPageComponent,
    AllianceDetailsPageComponent, 
    AllianceAdminPageComponent, EditAllianceModalComponent, AllianceChallengesPageComponent, AllianceChallengeExercisesPageComponent
  ],
  imports: [
    CommonModule,
    AllianceRoutingModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    InfinitySelectModule,
    MatInputModule,
    MatDatepickerModule,
    UiModalModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ],
  providers: [AlliancesApiService, AlliancesService]
})
export class AllianceModule { }
