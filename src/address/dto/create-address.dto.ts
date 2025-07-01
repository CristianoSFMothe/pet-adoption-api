import {
  IsString,
  IsNotEmpty,
  Matches,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateAddressDto {
  @IsString({
    message: 'A rua deve ser inválido.',
  })
  @IsNotEmpty({
    message: 'A rua não pode ser vazia.',
  })
  street: string;

  @IsString({
    message: 'O número deve ser inválido.',
  })
  @IsNotEmpty({
    message: 'O número não pode ser vazio.',
  })
  number: string;

  @IsString({
    message: 'O CEP deve ser inválido.',
  })
  @IsNotEmpty({
    message: 'O CEP não pode ser vazio.',
  })
  @Matches(/^\d{5}-\d{3}$/, {
    message: 'O CEP deve estar no formato XXXXX-XXX.',
  })
  zipCode: string;

  @IsString({
    message: 'O bairro deve ser inválido.',
  })
  @IsNotEmpty({
    message: 'O bairro não pode ser vazio.',
  })
  neighborhood: string;

  @IsOptional()
  @IsString({
    message: 'O complemento deve ser inválido.',
  })
  complement?: string;

  @IsString({
    message: 'O estado deve ser inválido.',
  })
  @IsNotEmpty({
    message: 'O estado não pode ser vazio.',
  })
  state: string;

  @IsUUID('4', {
    message: 'O ID do usuário deve ser um UUID válido.',
  })
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório' })
  userId: string;
}
