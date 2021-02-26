import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sb-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseDetailsComponent {
  mode: 'raw' | 'result' | 'both' = 'both';

  @Input() public code: string;
  @Output() public codeChange = new EventEmitter<string>();


  onMarkdownChange(markdown: string) {
    this.codeChange.emit(markdown);
  }

  isMarkdownVisible() {
    return this.mode === 'result' || this.mode === 'both';
  }

  isTextareaVisible() {
    return this.mode === 'raw' || this.mode === 'both';
  }
}
