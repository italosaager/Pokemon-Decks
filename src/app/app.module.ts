import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { DeckComponent } from './components/deck/deck.component';
import { AllPokemonsComponent } from './pages/all-pokemons/all-pokemons.component';
import { MyDecksComponent } from './pages/my-decks/my-decks.component';
import { CardComponent } from './components/card/card.component';
import { FormsModule } from '@angular/forms';
import { CreateDeckModalComponent } from './components/create-deck-modal/create-deck-modal.component';
import { FeedbackModalComponent } from './components/feedback-modal/feedback-modal.component';
import { DeckDetailsComponent } from './pages/deck-details/deck-details.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { EditDeckModalComponent } from './components/edit-deck-modal/edit-deck-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DeckComponent,
    AllPokemonsComponent,
    MyDecksComponent,
    CardComponent,
    CreateDeckModalComponent,
    FeedbackModalComponent,
    DeckDetailsComponent,
    ConfirmationModalComponent,
    EditDeckModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
