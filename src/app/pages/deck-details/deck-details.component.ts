import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from '../../services/deck.service';
import { Deck } from '../../models/deck.model';

@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details.component.html'
})
export class DeckDetailsComponent implements OnInit {
  deck: Deck | undefined;
  showEditModal: boolean = false;
  uniqueTypesCount: number = 0;
  trainerCardsCount: number = 0;

  constructor(private deckService: DeckService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const deckId = params['id'];
      this.deck = this.deckService.getDeckById(deckId);

      if (this.deck) {
        this.calculateTrainerCards();
        this.calculateUniqueTypes();
      } else {
        console.error('Deck not found!');
      }
    });
  }

  calculateTrainerCards() {
    this.trainerCardsCount = this.deck?.cards.filter(card => card.supertype === 'Trainer').reduce((acc, card) => acc + card.count, 0) || 0;
  }

  calculateUniqueTypes() {
    const allTypes = this.deck?.cards.flatMap(card => card.types || []);
    this.uniqueTypesCount = new Set(allTypes).size;
  }

  openEditModal() {
    this.showEditModal = true;
  }

  handleModalClose() {
    this.showEditModal = false;
  }

  handleDeckUpdated(success: boolean) {
    this.showEditModal = false;
    if (success) {
      console.log('Deck updated successfully!');
    } else {
      console.error('Failed to update deck.');
    }
  }
}
