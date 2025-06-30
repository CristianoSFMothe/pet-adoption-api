import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: 'O nome inválido.',
  })
  @IsNotEmpty({
    message: 'O nome não pode ser vazio.',
  })
  name: string;

  @IsEmail(
    {},
    {
      message: 'O e-mail fornecido não é válido.',
    },
  )
  @IsNotEmpty({
    message: 'O e-mail não pode ser vazio.',
  })
  email: string;

  @IsString({ message: 'A senha inválida.' })
  @IsNotEmpty({
    message: 'O senha não pode ser vazio.',
  })
  @MinLength(6, {
    message: 'A senha deve ter pelo menos 6 caracteres.',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'A senha deve conter pelo menos uma letra minúscula.',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula.',
  })
  @Matches(/(?=.*\d)/, {
    message: 'A senha deve conter pelo menos um número.',
  })
  @Matches(/(?=.*[@$!%*?&])/, {
    message: 'A senha deve conter pelo menos um caractere especial.',
  })
  password: string;
}
