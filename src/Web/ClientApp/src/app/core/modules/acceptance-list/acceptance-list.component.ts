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
  @Input() rippleEnabled = true;

  @Input() buttons: AcceptanceListButton[] = this.defaultButtons;

  @Output() btnClicked = new EventEmitter<AcceptanceListButtonClicked<any>>();
  @Output() rowClicked = new EventEmitter<any>();

  click(button: string, row: any, event: MouseEvent) {
    event.stopPropagation();
    this.btnClicked.emit({button, row})
  }
}
