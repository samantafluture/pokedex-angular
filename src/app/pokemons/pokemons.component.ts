import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css'],
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[] = [];
  // selectedPokemon?: Pokemon;

  constructor(
    private pokemonService: PokemonService,
    // private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  // onSelect(pokemon: Pokemon) {
  //   this.selectedPokemon = pokemon;
  //   this.messageService.add(
  //     `PokemonsComponent: Selected pokemon id=${pokemon.id}`
  //   );
  // }

  getPokemons(): void {
    this.pokemonService
      .getPokemons()
      .subscribe((pokemons) => (this.pokemons = pokemons));
  }
}
