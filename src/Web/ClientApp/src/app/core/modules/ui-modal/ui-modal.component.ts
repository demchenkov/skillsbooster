import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sb-modal',
  templateUrl: './ui-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiModalComponent {
  @Input() title: string;
  @Input() action: string = 'OK';
  @Input() isDisabled = false;
  @Output() confirm = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }
}
