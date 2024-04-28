import { Injectable } from '@angular/core';
import { Deck } from '../models/deck.model';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private decks: Deck[] = [];

  constructor() { }

  getDecks(): Deck[] {
    return this.decks;
  }

  getDeckById(id: string): Deck | undefined {
    return this.decks.find(deck => deck.id === id);
  }
  
  addDeck(name: string, cards: Card[]): boolean {
    if (cards.length < 24 || cards.length > 60) {
      return false;
    }

    const nameCount = new Map();
    for (const card of cards) {
      nameCount.set(card.name, (nameCount.get(card.name) || 0) + 1);
      if (nameCount.get(card.name) > 4) {
        return false;
      }
    }

    const deck: Deck = {
      id: Math.random().toString(36).substring(2, 15),
      name: name,
      cards: cards
    };
    this.decks.push(deck);
    return true;
  }

  removeDeck(id: string): void {
    this.decks = this.decks.filter(deck => deck.id !== id);
  }

  editDeck(id: string, name: string, cards: Card[]): boolean {
    const index = this.decks.findIndex(deck => deck.id === id);
    if (index !== -1) {
      this.decks[index].name = name;
      this.decks[index].cards = cards;
      return true;
    }
    return false;
  }
}
