import { Injectable } from '@angular/core';
import { POKEMONS } from './mock-pokemons';
import { Pokemon } from './pokemon';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private messageService: MessageService) {}

  getPokemons(): Observable<Pokemon[]> {
    const pokemons = of(POKEMONS);
    this.messageService.add('PokemonService: fetched pokemons');
    return pokemons;
  }

  getPokemon(id: number): Observable<Pokemon> {
    const pokemon = POKEMONS.find((p) => p.id === id)!;
    this.messageService.add(`PokemonService: fetched pokémon id=${id}`);
    return of(pokemon);
  }
}
