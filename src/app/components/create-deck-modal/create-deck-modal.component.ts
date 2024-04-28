import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { ApiService } from '../../services/api.service';
import { Card } from '../../models/card.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-deck-modal',
  templateUrl: './create-deck-modal.component.html',
})
export class CreateDeckModalComponent implements OnInit {
  deckName: string = '';
  cards: Card[] = [];
  totalCards: number = 0;
  showFeedbackModal: boolean = false;
  feedbackTitle: string = '';
  feedbackMessage: string = '';

  @Output() close = new EventEmitter<void>();
  @Output() deckCreated = new EventEmitter<boolean>();

  constructor(private deckService: DeckService, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.getCards().subscribe(cards => {
      this.cards = cards.map((card: any) => ({ ...card, count: 0 }));
      this.updateTotalCards();
    });
  }

  updateCardCount(card: Card, change: number) {
    let newCount = card.count + change;
    if (newCount >= 0 && newCount <= 4) {
      card.count = newCount;
      this.updateTotalCards();
    }
  }

  createDeck() {
    if (!this.deckName.trim()) {
      this.feedbackTitle = 'Missing Deck Name';
      this.feedbackMessage = 'You must enter a deck name.';
      this.showFeedbackModal = true;
      return;
    }

    if (this.isDuplicateDeckName(this.deckName)) {
      this.feedbackTitle = 'Duplicate Deck Name';
      this.feedbackMessage = 'A deck with this name already exists. Please choose a different name.';
      this.showFeedbackModal = true;
      return;
    }

    if (!this.isValidDeck()) {
      this.feedbackTitle = 'Invalid Configuration';
      this.feedbackMessage = 'Ensure the deck has 24-60 cards and no more than 4 copies of any card.';
      this.showFeedbackModal = true;
      return;
    }

    const selectedCards = this.cards.filter(card => card.count > 0);
    const success = this.deckService.addDeck(this.deckName, selectedCards);
    if (success) {
      this.feedbackTitle = 'Success';
      this.feedbackMessage = 'Deck was created successfully!';
      this.deckCreated.emit(true);
      this.showFeedbackModal = true;
      this.closeModal();
      this.router.navigate(['/mydecks']);
    } else {
      this.feedbackTitle = 'Error';
      this.feedbackMessage = 'Failed to create the deck.';
      this.showFeedbackModal = true;
    }
  }

  isDuplicateDeckName(name: string) {
    const decks = this.deckService.getDecks();
    return decks.some(deck => deck.name.toLowerCase() === name.toLowerCase());
  }

  closeModal() {
    this.close.emit();
    this.showFeedbackModal = false;
  }

  closeFeedbackModal() {
    this.showFeedbackModal = false;
  }

  randomizeDeck() {
    this.cards.forEach(card => card.count = 0);
  
    const totalCards = Math.floor(Math.random() * (60 - 24 + 1)) + 24;
    let cardCountsByName = new Map();
  
    while (cardCountsByName.size < 24) {
      let index = Math.floor(Math.random() * this.cards.length);
      let cardName = this.cards[index].name;
      if (!cardCountsByName.has(cardName)) {
        cardCountsByName.set(cardName, 1);
      }
    }
  
    let currentCardCount = Array.from(cardCountsByName.values()).reduce((acc, count) => acc + count, 0);
    while (currentCardCount < totalCards) {
      let index = Math.floor(Math.random() * this.cards.length);
      let cardName = this.cards[index].name;
      let count = cardCountsByName.get(cardName) || 0;
      if (count < 4) {
        cardCountsByName.set(cardName, count + 1);
        currentCardCount++;
      }
    }
  
    this.cards.forEach(card => {
      card.count = cardCountsByName.get(card.name) || 0;
    });
  
    this.updateTotalCards();
  }
  
  isValidDeck() {
    const totalCards = this.totalCards;
    const uniqueCards = new Set(this.cards.filter(card => card.count > 0).map(card => card.name)).size;
    return totalCards >= 24 && totalCards <= 60 && uniqueCards >= 24;
  }

  updateTotalCards() {
    this.totalCards = this.cards.reduce((acc, card) => acc + card.count, 0);
  }
  
  
}
