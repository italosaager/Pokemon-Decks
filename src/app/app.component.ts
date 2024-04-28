import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  cards: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCards().subscribe({
      next: (cards) => {
        this.cards = cards;
      },
      error: (error) => {
        console.error('Error fetching data: ', error);
      }
    });
  }
}
