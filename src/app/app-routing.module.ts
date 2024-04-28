import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyDecksComponent } from './pages/my-decks/my-decks.component';
import { AllPokemonsComponent } from './pages/all-pokemons/all-pokemons.component';
import { DeckDetailsComponent } from './pages/deck-details/deck-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'mydecks', component: MyDecksComponent },
  { path: 'allpokemons', component: AllPokemonsComponent },
  { path: 'deck/:id', component: DeckDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
