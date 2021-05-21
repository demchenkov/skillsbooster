import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sb-editor',
  templateUrl: './editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnChanges {
  @Input() public language = 'text';
  @Input() public editable = true;
  @Input() public code = '';
  @Output() codeChange = new EventEmitter<string>();
  @Output() editorInit = new EventEmitter<void>();

  editorOptions$ = new BehaviorSubject<any>({ theme: 'vs-dark' });

  onCodeChange(code: string) {
    this.codeChange.emit(code);
  }

  onInit() {
    this.editorInit.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.language) {
      this.editorOptions$.next({
        ...this.editorOptions$.value,
        language: changes.language.currentValue,
      });
    }
  }
}
