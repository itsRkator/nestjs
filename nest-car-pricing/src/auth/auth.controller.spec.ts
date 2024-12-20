import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

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
    fakeAuthService = {
      // signup: () => {},
      signin: (signInDto: { email: string; password: string }) =>
        Promise.resolve({
          id: 1,
          email: signInDto.email,
          password: signInDto.password,
        } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should signin a user', async () => {
    const session = { userId: null };
    const user = await controller.signin(
      {
        email: 'test@test.com',
        password: 'qwerty!123',
      },
      session,
    );

    expect(user).toBeDefined();
    expect(user.id).toEqual(1);
    expect(session).toHaveProperty('userId');
    expect(session.userId).toEqual(1);
  });
});
