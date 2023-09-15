import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import mongoose, { Model, isValidObjectId } from 'mongoose';
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

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      if (error.code === 11000)
        throw new ConflictException(
          `Pokemon with ${Object.keys(error.keyPattern)}: ${Object.values(
            error.keyValue,
          )} already exists`,
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

  async findOne(param: string) {
    let pokemon: Pokemon;

    // Search by no
    if (!isNaN(+param))
      pokemon = await this.pokemonModel.findOne({ no: param });

    // Search by MongoId
    if (isValidObjectId(param))
      pokemon = await this.pokemonModel.findById(param);

    // Search by name
    if (!pokemon) pokemon = await this.pokemonModel.findOne({ name: param });

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, no or name ${id} not found`,
      );

    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
