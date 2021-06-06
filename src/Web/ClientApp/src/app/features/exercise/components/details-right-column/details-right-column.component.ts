import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Exercise, Submission } from 'src/app/domain/entities';

@Component({
  selector: 'sb-details-right-column',
  templateUrl: './details-right-column.component.html',
  styleUrls: ['./details-right-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsRightColumnComponent{

  @Input() languages: {id: string, name: string}[];
  @Input() language: string;
  @Input() loading: boolean;
  @Input() exercise: Exercise;

  @Output() submit = new EventEmitter<Partial<Submission>>();
  @Output() editorInit = new EventEmitter<void>();

  code: string = '';


  onSubmit(exerciseId: number, code: string, language: string) {
    this.submit.emit({
      body: code,
      exerciseId,
      langKey: language
    });
  }
}
