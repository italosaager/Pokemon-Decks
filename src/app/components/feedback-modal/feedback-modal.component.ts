import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html'
})
export class FeedbackModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Output() closeFeedback = new EventEmitter<void>();

  close() {
    this.closeFeedback.emit();
  }
}
