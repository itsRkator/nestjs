import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{10}$/, {
    message: 'Phone number must be a valid 10-digit number',
  })
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
