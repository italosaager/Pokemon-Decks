import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html'
})
export class ConfirmationModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  confirm() {
    this.onConfirm.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}
