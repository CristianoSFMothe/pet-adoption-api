// src/pet/dto/create-pet.dto.ts
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { CoatType } from 'src/common/enums/coat-type.enum';

export class CreatePetDto {
  @IsString({
    message: 'O nome do pet deve ser uma string.',
  })
  @IsNotEmpty({
    message: 'O nome do pet não pode ser vazio.',
  })
  name: string;

  @IsString({
    message: 'O tipo do pet deve ser uma string.',
  })
  @IsNotEmpty({
    message: 'O tipo do pet é obrigatório.',
  })
  type: string;

  @IsOptional()
  @IsString()
  breed?: string;

  @IsBoolean({
    message: 'O campo isPurebred deve ser um booleano.',
  })
  @IsOptional()
  isPurebred?: boolean;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsEnum(CoatType, {
    message: 'O tipo de pelagem deve ser um dos valores válidos.',
  })
  coatType?: CoatType;

  @IsInt({
    message: 'A idade deve ser um número inteiro.',
  })
  @Min(0, {
    message: 'A idade deve ser um número positivo.',
  })
  age: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isAvailableForAdoption?: boolean;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsUUID('4', {
    message: 'O ID do dono deve ser um UUID válido.',
  })
  ownerId: string;

  @IsUUID('4', {
    message: 'O ID do endereço deve ser um UUID válido.',
  })
  ownerAddressId: string;
}
