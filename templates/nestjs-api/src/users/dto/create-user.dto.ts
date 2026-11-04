import { IsNotEmpty, IsOptional, IsString, isEmail, Matches, ValidateBy } from 'class-validator';

export class CreateUserDto {
  @ValidateBy(
    {
      name: 'isTrimmedEmail',
      validator: {
        validate: (value: unknown) => typeof value === 'string' && isEmail(value.trim()),
      },
    },
    { message: 'El correo electrónico debe ser válido' },
  )
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @Matches(/\S/, { message: 'El nombre es requerido' })
  name: string;

  @IsString()
  @IsOptional()
  role?: string;
}
