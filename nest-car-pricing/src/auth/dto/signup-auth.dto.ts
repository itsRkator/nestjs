import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupDto {
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
  @MinLength(6)
  @MaxLength(32)
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,32}$/, {
    message:
      'Password must contain at least one letter, one number, and one special character.',
  })
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,32}$/, {
    message:
      'Password must contain at least one letter, one number, and one special character.',
  })
  confirmPassword: string;
}
