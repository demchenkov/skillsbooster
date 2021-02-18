import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseRoutingModule } from "./exercise-routing.module";
import { ExerciseListPageComponent } from './exercise-list-page/exercise-list-page.component';
import { MatListModule } from "@angular/material/list";
import { MatSortModule } from '@angular/material/sort';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@NgModule({
  declarations: [ExerciseListPageComponent, ExerciseListComponent],
  imports: [
    CommonModule,
    ExerciseRoutingModule,
    MatTableModule,
    MatListModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ]
})
export class ExerciseModule { }
