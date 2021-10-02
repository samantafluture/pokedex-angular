import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css'],
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService
      .getPokemons()
      .subscribe((pokemons) => (this.pokemons = pokemons));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.pokemonService.addPokemon({ name } as Pokemon).subscribe((pokemon) => {
      this.pokemons.push(pokemon);
    });
  }

  delete(pokemon: Pokemon): void {
    this.pokemons = this.pokemons.filter((p) => p !== pokemon);
    this.pokemonService.deletePokemon(pokemon.id).subscribe();
  }
}
