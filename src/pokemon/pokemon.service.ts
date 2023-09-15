import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    let pokemon = await this.pokemonModel.findOne({
      no: createPokemonDto.no,
    });

    if (pokemon)
      throw new ConflictException(
        `Pokemon ${createPokemonDto.name} already exists`,
      );

    pokemon = await this.pokemonModel.create(createPokemonDto);

    console.log(pokemon);
    return pokemon;
  }

  findAll() {
    const pokemons = this.pokemonModel.find({});
    return pokemons;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
