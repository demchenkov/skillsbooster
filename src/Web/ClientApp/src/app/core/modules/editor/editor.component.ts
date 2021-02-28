import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sb-editor',
  templateUrl: './editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent {
  @Input() public language = 'text';
  @Input() public editable = true;
  @Input() public code = '';
  @Output() codeChange = new EventEmitter<string>();
  @Output() editorInit = new EventEmitter<void>();

  editorOptions = { theme: 'vs-dark' };

  onCodeChange(code: string) {
    this.codeChange.emit(code);
  }

  onInit() {
    console.log('visible');
    this.editorInit.emit();
  }
}
