import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule
  ],
  exports: [EditorComponent]
})
export class EditorModule { }
