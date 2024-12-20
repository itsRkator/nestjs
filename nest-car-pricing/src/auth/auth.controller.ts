import {
  Controller,
  Post,
  Body,
  Session,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup-auth.dto';
import { SigninDto } from './dto/signin-auth.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserInfoDto } from '../users/dto/user-info.dto';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from './decorators/current-user.decorators';
import { AuthGuard } from 'src/guards/auth.guard';

@Serialize(UserInfoDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get('identify')
  // identify(@Session() session: any) {
  //   return this.authService.identify(session.userId);
  // }

  @Get('identify')
  @UseGuards(AuthGuard)
  identify(@CurrentUser() user: User) {
    return user;
  }

  @Post('signout')
  signOut(@Session() session: any) {
    session.userId = null;

    return true;
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto, @Session() session: any) {
    const user = await this.authService.signup(signupDto);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto, @Session() session: any) {
    const user = await this.authService.signin(signinDto);
    session.userId = user.id;
    return user;
  }
}
