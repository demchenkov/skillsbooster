import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { ExerciseDetailsPageComponent } from './containers/exercise-details-page/exercise-details-page.component';
import { ExerciseEditorPageComponent } from './containers/exercise-editor-page/exercise-editor-page.component';
import {ExerciseListPageComponent} from "./containers/exercise-list-page/exercise-list-page.component";

const routes: Routes = [
  {
    path: '',
    component: ExerciseListPageComponent,
    data: { title: 'Problems' }
  },
  {
    path: ':id',
    component: ExerciseDetailsPageComponent,
    data: { title: 'Problem' }
  },
  {
    path: ':id/edit',
    component: ExerciseEditorPageComponent,
    data: { title: 'Problem' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseRoutingModule { }
