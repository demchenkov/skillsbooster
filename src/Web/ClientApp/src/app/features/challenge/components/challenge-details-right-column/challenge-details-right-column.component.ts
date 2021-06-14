import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Exercise, Submission } from 'src/app/domain/entities';

@Component({
  selector: 'sb-challenge-details-right-column',
  templateUrl: './challenge-details-right-column.component.html',
  styleUrls: ['./challenge-details-right-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChallengeDetailsRightColumnComponent{

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
