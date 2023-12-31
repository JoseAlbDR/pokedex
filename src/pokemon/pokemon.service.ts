import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private readonly defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    // const { limit, offset } = paginationDto;
    // let query = this.pokemonModel.find({}).sort('no');

    // query = limit ? query.limit(limit) : query.limit(10);

    // query = offset ? query.skip(offset) : query;

    // const pokemons = await query;

    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    const pokemons = await this.pokemonModel
      .find({})
      .limit(limit)
      .skip(offset)
      .sort('no');

    return pokemons;
  }

  async findOne(param: string) {
    let pokemon: Pokemon;

    // Search by no
    if (!isNaN(+param))
      pokemon = await this.pokemonModel.findOne({ no: param });

    // Search by MongoId
    if (!pokemon && isValidObjectId(param))
      pokemon = await this.pokemonModel.findById(param);

    // Search by name
    if (!pokemon) pokemon = await this.pokemonModel.findOne({ name: param });

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, no or name ${param} not found`,
      );

    return pokemon;
  }

  async update(param: string, updatePokemonDto: UpdatePokemonDto) {
    let pokemon = await this.findOne(param);

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, no or name ${param} not found`,
      );

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      pokemon = await this.pokemonModel.findByIdAndUpdate(
        pokemon.id,
        updatePokemonDto,
        {
          new: true,
        },
      );

      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);

    // await pokemon.deleteOne();

    // const result = await this.pokemonModel.findByIdAndDelete(id);

    const result = await this.pokemonModel.deleteOne({ _id: id });

    if (result.deletedCount < 1)
      throw new NotFoundException(`Pokemon with id ${id} not found`);

    return result;
  }

  private handleExceptions(error: any) {
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
