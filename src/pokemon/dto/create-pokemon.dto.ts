import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreatePokemonDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  no: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}
