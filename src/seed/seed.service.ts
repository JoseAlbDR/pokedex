import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly pokemonService: PokemonService,
  ) {}
  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1500',
    );

    // const insertPromisesArray: Promise<any>[] = [];

    // data.results.forEach(({ name, url }) => {
    //   const no = +url.split('/').at(-2);
    //   // this.pokemonService.create({ no, name });
    //   // this.pokemonModel.create({ no, name });
    //   insertPromisesArray.push(this.pokemonService.create({ name, no }));
    // });

    // await Promise.all(insertPromisesArray);

    const pokemonToInsert: { name: string; no: number }[] = data.results.map(
      ({ name, url }) => {
        const no = +url.split('/').at(-2);
        return { name, no };
      },
    );

    await this.pokemonModel.insertMany(pokemonToInsert);

    return `${pokemonToInsert.length} pokemons inserted successfully`;
  }
}
