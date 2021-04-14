import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

export interface AcceptanceListButton {
  button: string;
  iconName: string;
  color: string;
}

export interface AcceptanceListButtonClicked<T> {
  row: T;
  button: string;
}

@Component({
  selector: 'sb-acceptance-list',
  templateUrl: './acceptance-list.component.html',
  styleUrls: ['./acceptance-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcceptanceListComponent {
  private defaultButtons: AcceptanceListButton[] = [
    {iconName: 'check', color: 'accent', button: 'accept'},
    {iconName: 'close', color: 'warn', button: 'decline'},
  ]

  @Input() entities: any[];
  @Input() titleGetter: (row: any) => any = row => row.name;
  @Input() loading = false;

  @Input() buttons: AcceptanceListButton[] = this.defaultButtons;

  @Output() clicked = new EventEmitter<AcceptanceListButtonClicked<any>>();

  click(button: string, row: any) {
    this.clicked.emit({button, row})
  } 
}
