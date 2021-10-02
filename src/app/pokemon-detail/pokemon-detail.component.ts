import { PokemonService } from './../pokemon.service';
import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemon?: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService
      .getPokemon(id)
      .subscribe((pokemon) => (this.pokemon = pokemon));
  }

  goBack() {
    this.location.back();
  }

  save(): void {
    if (this.pokemon) {
      this.pokemonService.updatePokemon(this.pokemon)
        .subscribe(() => this.goBack());
    }
  }
}
