import { Component, Input, EventEmitter, Output } from '@angular/core';
import { DeckService } from '../../services/deck.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
})
export class DeckComponent {
  @Input() deckName: any;
  @Input() deckId: string = '';
  @Output() deckRemoved = new EventEmitter<void>(); 

  showConfirmationModal: boolean = false;

  constructor(private deckService: DeckService) { }

  confirmRemoval() {
    this.deckService.removeDeck(this.deckId);
    this.deckRemoved.emit(); 
    this.showConfirmationModal = false;
  }
}
