import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePokemonDto {
  @IsNotEmpty()
  @IsNumber()
  no: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
