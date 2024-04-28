import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.pokemontcg.io/v1/cards';
  private cardsStore: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public readonly cards$: Observable<any[]> = this.cardsStore.asObservable();
  
  constructor(private http: HttpClient) { }

  getCards(): Observable<any> {
    if (this.cardsStore.getValue().length === 0) {
      this.http.get<any>(this.apiUrl).pipe(
        tap(data => {
          this.cardsStore.next(data.cards);
        })
      ).subscribe();
    }
    return this.cards$;
  }

}
