import { Component } from '@angular/core';
import { DeckService } from '../../services/deck.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  decksNumber: number = 0;
  mostUsedPokemon: string = '';
  showModal: boolean = false;
  showFeedbackModal: boolean = false;
  feedbackTitle: string = '';
  feedbackMessage: string = '';

  constructor(private deckService: DeckService) { }

  ngOnInit() {
    this.getDecksNumber();
    this.getMostUsedPokemon();
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
  
  getDecksNumber() {
    this.decksNumber = this.deckService.getDecks().length;
  }

  getMostUsedPokemon() {
    const decks = this.deckService.getDecks();
    const cardCountsByName = new Map<string, number>();
    let maxCount = 0;
    let mostUsedName = '';

    for (const deck of decks) {
      for (const card of deck.cards) {
        const count = cardCountsByName.get(card.name) || 0;
        cardCountsByName.set(card.name, count + 1);
        if (count + 1 > maxCount) {
          maxCount = count + 1;
          mostUsedName = card.name;
        }
      }
    }
    this.mostUsedPokemon = mostUsedName;
  }
}
