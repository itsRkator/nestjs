import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Option 1
    fakeUsersService = {
      find: () => Promise.resolve([] as User[]),
      create: (createUserDto: {
        name: string;
        email: string;
        phone: string;
        password: string;
      }) =>
        Promise.resolve({
          id: 1,
          email: createUserDto.email,
          password: createUserDto.password,
        } as User),
    };

    // Option 2
    // const users: User[] = [];
    // fakeUsersService = {
    //   find: (email: string) => {
    //     const filteredUsers = users.filter((user) => user.email === email);
    //     return Promise.resolve(filteredUsers);
    //   },
    //   create: (createUserDto: {
    //     name: string;
    //     email: string;
    //     phone: string;
    //     password: string;
    //   }) => {
    //     const { name, email, phone, password } = createUserDto;
    //     const user = {
    //       id: Math.floor(Math.random() * 999999),
    //       name,
    //       phone,
    //       email,
    //       password,
    //     } as User;

    //     users.push(user);
    //     return Promise.resolve(user);
    //   },
    // };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user with a salted and hashed password', async () => {
    const user = await service.signup({
      email: 'test@test.com',
      name: 'Test',
      phone: '987654210',
      password: 'qwerty!123',
      confirmPassword: 'qwerty!123',
    });

    expect(user.password).not.toEqual('qwerty!123');

    const [salt, hashedPassword] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hashedPassword).toBeDefined();
  });

  it('should throw an error if email already exists during signup', async () => {
    // Option 1
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, name: 'Test', email: 'test@test.com', password: 'qwerty!123' },
      ] as User[]);

    // Option 2
    // await service.signup({
    //   email: 'test@test.com',
    //   name: 'Test',
    //   phone: '987654210',
    //   password: 'qwerty!123',
    //   confirmPassword: 'qwerty!123',
    // });

    await expect(
      service.signup({
        email: 'test@test.com',
        name: 'Test',
        phone: '987654210',
        password: 'qwerty!123',
        confirmPassword: 'qwerty!123',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw an error if email is not registered during signin', async () => {
    await expect(
      service.signin({ email: 'test@test.com', password: 'qwerty!123' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw an error if password is incorrect during signin', async () => {
    // Option 1
    fakeUsersService.find = () =>
      Promise.resolve([
        { email: 'test@test.com', password: 'qwerty!123' },
      ] as User[]);

    // Option 2
    // await service.signup({
    //   email: 'test@test.com',
    //   name: 'Test',
    //   phone: '987654210',
    //   password: 'qwerty!123',
    //   confirmPassword: 'qwerty#123',
    // });

    await expect(
      service.signin({ email: 'test@test.com', password: 'qwerty!123' }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should return user if password is correct during signin', async () => {
    // Option 1
    const promisifiedScrypt = promisify(scrypt);
    const salt = randomBytes(12).toString('hex');
    const hashedPassword = (await promisifiedScrypt(
      'qwerty!123',
      salt,
      32,
    )) as Buffer;

    const saltedHashedPassword = salt + '.' + hashedPassword.toString('hex');

    fakeUsersService.find = () =>
      Promise.resolve([
        {
          email: 'test@test.com',
          password: saltedHashedPassword,
        },
      ] as User[]);

    const user = await service.signin({
      email: 'test@test.com',
      password: 'qwerty!123',
    });

    expect(user).toBeDefined();

    // Option 2
    // await service.signup({
    //   email: 'test@test.com',
    //   name: 'Test',
    //   phone: '987654210',
    //   password: 'qwerty!123',
    //   confirmPassword: 'qwerty!123',
    // });
    // const user = await service.signin({
    //   email: 'test@test.com',
    //   password: 'qwerty!123',
    // });
    // expect(user).toBeDefined();
  });
});
