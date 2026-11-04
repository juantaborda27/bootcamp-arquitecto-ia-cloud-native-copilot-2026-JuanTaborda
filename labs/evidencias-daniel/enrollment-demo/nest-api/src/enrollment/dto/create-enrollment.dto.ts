import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEnrollmentDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
