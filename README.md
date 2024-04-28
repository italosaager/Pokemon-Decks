# PokemonDecks

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Architecture

Project separated by components, interface models, pages and services.

### Components

* Card:
Reusable component to render the cards

* Confirmation Modal
Reusable component to confirm actions

* Create Deck Modal
Reusable component for deck creation

* Deck
Reusable component to render the decks

* Edit Deck Modal
Reusable component for deck edition

* Feedback Modal
Reusable component to give feedback about actions

* Header
Reusable component to render the navigation bar

### Models

* Card
Card Interface

* Deck
Deck Interface

### Pages
* Home
Application home page with some information

* All Pokemons
Page that allows you to view all available cards

* My Decks
Page that allows you to view the decks created

* Deck Details
Page that allows you to view deck details

### Services

* API Service
Searches for data in the Pokemon API and stores the values ​​in memory

* Deck Service
Creates features related to decks based on the API search

## Functionalities

* Create deck
* View created decks
* Remove created decks
* Edit created decks
* View deck details
* List all available cards
* Filter the list of available cards

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
