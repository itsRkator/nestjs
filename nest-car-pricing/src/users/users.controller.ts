import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserInfoDto } from './dto/user-info.dto';

@Controller('auth')
@Serialize(UserInfoDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('users')
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Get('user')
  findUserByEmail(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Get('user/:id')
  findUserById(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('user/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('user/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
