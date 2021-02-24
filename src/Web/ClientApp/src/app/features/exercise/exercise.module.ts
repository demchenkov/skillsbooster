import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseRoutingModule } from "./exercise-routing.module";
import { ExerciseListPageComponent } from './containers/exercise-list-page/exercise-list-page.component';
import { MatListModule } from "@angular/material/list";
import { MatSortModule } from '@angular/material/sort';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ExercisesApiService, ExercisesService } from './services';
import { HttpClientModule } from '@angular/common/http';
import { ExerciseDetailsComponent } from './components/exercise-details/exercise-details.component';
import { ExerciseDetailsPageComponent } from './containers/exercise-details-page/exercise-details-page.component';



@NgModule({
  declarations: [ExerciseListPageComponent, ExerciseDetailsPageComponent, ExerciseListComponent, ExerciseDetailsComponent],
  imports: [
    CommonModule,
    ExerciseRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatListModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  providers: [ExercisesService, ExercisesApiService]
})
export class ExerciseModule { }
