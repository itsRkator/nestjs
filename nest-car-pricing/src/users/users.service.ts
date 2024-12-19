import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, phone, password, confirmPassword } = createUserDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const user = this.userRepository.create({ name, email, password, phone });
    await this.userRepository.save(user);
    return user;
  }

  findAll() {
    return this.userRepository.find();
  }

  async find(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { name, email, phone, password, confirmPassword } = updateUserDto;

    if (password && confirmPassword && password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }
    if (phone) {
      user.phone = phone;
    }

    if (password) {
      user.password = password;
    }

    await this.userRepository.save(user);
    return `Updates user #${id} user. ${JSON.stringify(user)}`;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    await this.userRepository.remove(user);
    return `Removed user #${id}`;
  }
}
