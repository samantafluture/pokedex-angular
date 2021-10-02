import { Injectable } from '@angular/core';
import { POKEMONS } from '../mocks/mock-pokemons';
import { Pokemon } from '../interfaces/pokemon';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private pokemonsUrl = 'api/pokemons';

  private log(message: string) {
    this.messageService.add(`PokemonService: ${message}`);
  }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
      tap((_) => this.log('fetched pokémons')),
      catchError(this.handleError<Pokemon[]>('getPokemons', []))
    );
  }

  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      tap((_) => this.log(`fetched pokémon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<any> {
    return this.http.put(this.pokemonsUrl, pokemon, this.httpOptions).pipe(
      tap((_) => this.log(`updated pokemon id=${pokemon.id}`)),
      catchError(this.handleError<any>('updatePokemon'))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http
      .post<Pokemon>(this.pokemonsUrl, pokemon, this.httpOptions)
      .pipe(
        tap((newPokemon: Pokemon) =>
          this.log(`added pokémon w/ id=${newPokemon.id}`)
        ),
        catchError(this.handleError<Pokemon>('addPokemon'))
      );
  }

  deletePokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/${id}`;

    return this.http.delete<Pokemon>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted pokémon id=${id}`)),
      catchError(this.handleError<Pokemon>('deletePokemon'))
    );
  }

  searchPokemons(term: string): Observable<Pokemon[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Pokemon[]>(`${this.pokemonsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found pokémons matching "${term}"`) :
         this.log(`no pokémons matching "${term}"`)),
      catchError(this.handleError<Pokemon[]>('searchPokemons', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
