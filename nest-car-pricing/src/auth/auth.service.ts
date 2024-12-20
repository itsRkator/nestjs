import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup-auth.dto';
import { SigninDto } from './dto/signin-auth.dto';
import { UsersService } from '../users/users.service';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const promisifiedScript = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  // identify(userId: number) {
  //   return this.usersService.findOne(userId);
  // }

  async signup(signupDto: SignupDto) {
    const { name, email, phone, password, confirmPassword } = signupDto;
    const users = await this.usersService.find(signupDto.email);

    if (users?.length > 0) {
      throw new BadRequestException('Email already exists.');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match.');
    }

    const salt = randomBytes(12).toString('hex');
    const hashedPasswords = (await promisifiedScript(
      password,
      salt,
      32,
    )) as Buffer;
    const saltedHashedPassword = salt + '.' + hashedPasswords.toString('hex');
    const user = await this.usersService.create({
      name,
      email,
      phone,
      password: saltedHashedPassword,
    });

    return user;
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('User does not exist.');
    }

    const [salt, storedHashedPassword] = user.password.split('.');
    const hashedPassword = (await promisifiedScript(
      password,
      salt,
      32,
    )) as Buffer;

    if (storedHashedPassword !== hashedPassword.toString('hex')) {
      throw new BadRequestException('Invalid Password');
    }

    return user;
  }
}
