import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-all-pokemons',
  templateUrl: './all-pokemons.component.html',
})
export class AllPokemonsComponent implements OnInit {
  cards: any[] = [];
  filteredCards: any[] = [];
  filterText: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.cards$.subscribe(cards => {
      this.cards = cards;
      this.applyFilter(); 
    });
  }

  applyFilter(): void {
    if (!this.filterText) {
      this.filteredCards = this.cards; 
    } else {
      this.filteredCards = this.cards.filter(card =>
        card.name.toLowerCase().includes(this.filterText.toLowerCase())
      );
    }
  }
}
