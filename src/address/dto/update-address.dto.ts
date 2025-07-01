import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { StateEnum } from 'src/common/enums/state.enum';

export class UpdateAddressDto {
  @IsString({
    message: 'A rua deve ser inválida.',
  })
  @IsOptional()
  street?: string;

  @IsString({
    message: 'O número deve ser inválido.',
  })
  @IsOptional()
  number?: string;

  @IsString({
    message: 'O CEP deve ser inválido.',
  })
  @IsOptional()
  @Matches(/^\d{5}-\d{3}$/, {
    message: 'O CEP deve estar no formato XXXXX-XXX.',
  })
  zipCode?: string;

  @IsString({
    message: 'O bairro deve ser inválido.',
  })
  @IsOptional()
  neighborhood?: string;

  @IsString({
    message: 'O complemento deve ser inválido.',
  })
  @IsOptional()
  complement?: string;

  @IsEnum(StateEnum, {
    message: 'O estado deve ser uma sigla válida (ex: SP, RJ, MG).',
  })
  @IsOptional()
  state?: StateEnum;

  @IsUUID('4', {
    message: 'O ID do usuário deve ser um UUID válido.',
  })
  @IsNotEmpty({
    message: 'O ID do usuário é obrigatório',
  })
  userId: string;
}
