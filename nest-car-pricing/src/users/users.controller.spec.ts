import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) =>
        Promise.resolve({
          id,
          name: 'Test',
          email: 'test@test.com',
          phone: '1234567890',
          password: 'password',
        } as User),
      find: (email: string) =>
        Promise.resolve([
          {
            id: 1,
            email,
            name: 'Test',
            phone: '1234567890',
            password: 'password',
          },
        ] as User[]),
      // remove: (id: number) => Promise.resolve(`User removed with #${id}`),
      // update: () => Promise.resolve(`User removed with #${id}`),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: fakeUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find a user by email', async () => {
    const users = await controller.findUserByEmail('test@test.com');

    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test@test.com');
  });

  it('should find a user by id', async () => {
    const user = await controller.findUserById('1');

    expect(user).toBeDefined();
  });

  it('should throw an error if user by id is not found', async () => {
    fakeUsersService.findOne = () => Promise.reject(new NotFoundException());

    await expect(controller.findUserById('1')).rejects.toThrow(
      NotFoundException,
    );
  });
});
