import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { Deck } from '../../models/deck.model';

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
})
export class MyDecksComponent {
  decks: Deck[] = []; 
  showModal: boolean = false;
  showFeedbackModal: boolean = false;
  feedbackTitle: string = '';
  feedbackMessage: string = '';
  showConfirmationModal: boolean = false;

  constructor(private deckService: DeckService) {}

  ngOnInit() {
    this.refreshDecks();
  }

  refreshDecks() {
    this.decks = this.deckService.getDecks();
  }

  handleModalClose() {
    this.showModal = false;
  }

  handleDeckCreated(success: boolean) {
    this.showModal = false;
    this.showFeedbackModal = true;
    if (success) {
      this.feedbackTitle = 'Success';
      this.feedbackMessage = 'The deck was created successfully!';
    } else {
      this.feedbackTitle = 'Error';
      this.feedbackMessage = 'Failed to create the deck.';
    }
  }

  handleFeedbackClose() {
    this.showFeedbackModal = false;
  }

  handleDeckRemoved() {
    this.refreshDecks(); 
  }
}
