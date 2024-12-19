import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Matches(/^\d{10}$/, {
    message: 'Phone number must be a valid 10-digit number',
  })
  phone?: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  @IsString()
  @IsOptional()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,32}$/, {
    message:
      'Password must contain at least one letter, one number, and one special character.',
  })
  password?: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  @IsString()
  @IsOptional()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,32}$/, {
    message:
      'Password must contain at least one letter, one number, and one special character.',
  })
  confirmPassword?: string;
}
