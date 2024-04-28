import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { ApiService } from '../../services/api.service';
import { Card } from '../../models/card.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-deck-modal',
  templateUrl: './edit-deck-modal.component.html',
})
export class EditDeckModalComponent implements OnInit {
  @Input() deckId: string = '';
  deckName: string = '';
  cards: Card[] = [];
  totalCards: number = 0;
  showFeedbackModal: boolean = false;
  feedbackTitle: string = '';
  feedbackMessage: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() deckUpdated = new EventEmitter<boolean>();

  constructor(private deckService: DeckService, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    const deck = this.deckService.getDeckById(this.deckId);
    if (deck) {
      this.deckName = deck.name;
      this.apiService.getCards().subscribe(allCards => {
        this.cards = allCards.map((card: any) => ({
          ...card,
          count: deck.cards.find(d => d.name === card.name)?.count || 0
        }));
        this.updateTotalCards();
      });
    }
  }

  updateCardCount(card: Card, change: number) {
    let newCount = card.count + change;
    if (newCount >= 0 && newCount <= 4) {
      card.count = newCount;
      this.updateTotalCards();
    }
  }

  updateDeck() {
    if (!this.deckName.trim()) {
      this.showFeedback('Missing Deck Name', 'You must enter a deck name.');
      return;
    }
  
    if (this.isDuplicateDeckName(this.deckName)) {
      this.showFeedback('Duplicate Deck Name', 'A deck with this name already exists. Please choose a different name.');
      return;
    }
  
    if (!this.isValidDeck()) {
      this.showFeedback('Invalid Configuration', 'Ensure the deck has 24-60 cards, no more than 4 copies of any card, and at least 24 different cards.');
      return;
    }
  
    const selectedCards = this.cards.filter(card => card.count > 0);
    const success = this.deckService.editDeck(this.deckId, this.deckName, selectedCards);
    if (success) {
      this.showFeedback('Success', 'Deck was updated successfully!');
      this.deckUpdated.emit(true);
      this.closeModal(); 
    } else {
      this.showFeedback('Error', 'Failed to update the deck.');
    }
  }

  isDuplicateDeckName(name: string) {
    const decks = this.deckService.getDecks();
    return decks.some(deck => deck.name.toLowerCase() === name.toLowerCase() && deck.id !== this.deckId);
  }

  isValidDeck() {
    const totalCards = this.totalCards;
    const uniqueCards = new Set(this.cards.filter(card => card.count > 0).map(card => card.name)).size;
    const noCardExceedsLimit = this.cards.every(card => card.count <= 4);
    return totalCards >= 24 && totalCards <= 60 && uniqueCards >= 24 && noCardExceedsLimit;
  }

  showFeedback(title: string, message: string) {
    this.feedbackTitle = title;
    this.feedbackMessage = message;
    this.showFeedbackModal = true;
  }

  closeModal() {
    this.showFeedbackModal = false;
    this.router.navigate(['/mydecks']);
  }

  closeFeedbackModal() {
    this.showFeedbackModal = false;
  }

  updateTotalCards() {
    this.totalCards = this.cards.reduce((acc, card) => acc + card.count, 0);
  }
}
