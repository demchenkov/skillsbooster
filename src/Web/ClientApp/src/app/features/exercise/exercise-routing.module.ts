import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ExerciseListPageComponent} from "./exercise-list-page/exercise-list-page.component";

const routes: Routes = [
  {
    path: '',
    component: ExerciseListPageComponent,
    data: { title: 'Problems' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseRoutingModule { }
