import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const pokemons = [
      { id: 25, name: 'pikachu', weight: 60, height: 4 },
      { id: 1, name: 'bulbasaur', weight: 69, height: 7 },
      { id: 4, name: 'charmander', weight: 85, height: 6 },
      { id: 7, name: 'squirtle', weight: 90, height: 5 },
      { id: 10, name: 'caterpie', weight: 29, height: 3 },
      { id: 16, name: 'pidgey', weight: 18, height: 3 },
      { id: 19, name: 'rattata', weight: 35, height: 3 },
      { id: 39, name: 'jigglypuff', weight: 55, height: 5 },
      { id: 41, name: 'zubat', weight: 75, height: 8 },
      { id: 52, name: 'meowth', weight: 42, height: 4 },
    ];
    return { pokemons };
  }

  // Overrides the genId method to ensure that a pokemon always has an id.
  // If the pokemons array is empty,
  // the method below returns the initial number (11).
  // if the pokemons array is not empty, the method below returns the highest
  // pokemon id + 1.
  genId(pokemons: Pokemon[]): number {
    return pokemons.length > 0
      ? Math.max(...pokemons.map((pokemon) => pokemon.id)) + 1
      : 11;
  }
}
