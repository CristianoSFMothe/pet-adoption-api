// src/phone/dto/create-phone.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsUUID,
  Matches,
} from 'class-validator';

export class CreatePhoneDto {
  @IsString({
    message: 'O número de telefone inválido.',
  })
  @IsNotEmpty({
    message: 'O número de telefone não pode ser vazio.',
  })
  @Matches(/^\(\d{2}\)\s\d{5}-\d{4}$/, {
    message: 'O número de telefone deve estar no formato (DD) 00000-0000.',
  })
  phoneNumber: string;

  @IsOptional()
  @IsBoolean({
    message: 'isWhatsapp deve ser um booleano.',
  })
  isWhatsapp?: boolean;

  @IsOptional()
  @IsBoolean({
    message: 'isPrimary deve ser um booleano.',
  })
  isPrimary?: boolean;

  @IsUUID('4', {
    message: 'O ID do usuário deve ser um UUID válido.',
  })
  userId: string;
}
