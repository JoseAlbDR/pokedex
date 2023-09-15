import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

    // let pokemon = await this.pokemonModel.findOne({
    //   no: createPokemonDto.no,
    // });

    // if (pokemon)
    //   throw new ConflictException(
    //     `Pokemon ${createPokemonDto.name} already exists`,
    //   );

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      if (error.code === 11000)
        throw new ConflictException(
          `Pokemon ${createPokemonDto.name} already exists`,
        );
      console.log(error);
      throw new InternalServerErrorException(
        "Can't create Pokemon, check server logs.",
      );
    }
  }

  async findAll() {
    const pokemons = await this.pokemonModel.find({});
    return pokemons;
  }

  async findOne(id: string) {
    const pokemon = await this.pokemonModel.findById(id);

    if (!pokemon)
      throw new NotFoundException(`Pokemon with id ${id} not found`);

    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
