import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter,
  ) {}
  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>(
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
