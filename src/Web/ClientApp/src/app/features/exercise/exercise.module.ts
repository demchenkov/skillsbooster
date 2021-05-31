import { NgModule, SecurityContext } from '@angular/core';
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
import { MarkdownModule } from 'ngx-markdown';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EditorModule } from 'src/app/core/modules/editor/editor.module';
import { ExerciseEditorPageComponent } from './containers/exercise-editor-page/exercise-editor-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';





@NgModule({
  declarations: [
    ExerciseListPageComponent,
    ExerciseDetailsPageComponent,
    ExerciseListComponent,
    ExerciseDetailsComponent,
    ExerciseEditorPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExerciseRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatListModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatTabsModule,
    EditorModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE
    })
  ],
  providers: [ExercisesApiService]
})
export class ExerciseModule { }
