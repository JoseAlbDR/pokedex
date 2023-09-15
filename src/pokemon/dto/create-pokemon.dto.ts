import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePokemonDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  no: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}
