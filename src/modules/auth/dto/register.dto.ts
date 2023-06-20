import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class RegisterDto {
  @IsNotEmpty()
    lastName: string

  @IsNotEmpty()
    firstName: string

  @IsEmail()
  @IsNotEmpty()
    email: string

  @IsString()
  @IsNotEmpty()
    password: string
}
