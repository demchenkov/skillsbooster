import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sb-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseDetailsComponent {
  mode: 'raw' | 'result' | 'both' = 'both';
  loading$ = new BehaviorSubject<boolean>(true);

  @Input() public code: string;
  @Output() public codeChange = new EventEmitter<string>();


  onEditorInit() {
    this.loading$.next(false);
  }

  onMarkdownChange(markdown: string) {
    this.codeChange.emit(markdown);
  }

  isMarkdownVisible() {
    return this.mode === 'result' || this.mode === 'both';
  }

  isTextareaVisible() {
    const visible = this.mode === 'raw' || this.mode === 'both';
    // if (!visible) {
    //   this.loading$.next(true);
    // }
    return visible;
  }
}
