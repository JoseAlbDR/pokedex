import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  constructor(private readonly pokemonService: PokemonService) {}
  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10&offset=10',
    );

    data.results.forEach(({ name, url }) => {
      const no = +url.split('/').at(-2);
      this.pokemonService.create({ no, name });
    });

    return `Database populated`;
  }
}
