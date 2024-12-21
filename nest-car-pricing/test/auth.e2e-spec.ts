import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should handle signup', () => {
    const providedEmail = 'test@test.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'Test',
        email: providedEmail,
        phone: '9876543210',
        password: 'qwerty!123',
        confirmPassword: 'qwerty!123',
      })
      .expect(201)
      .then((res) => {
        const { email, id } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(providedEmail);
      });
  });

  it('should signup and return the current signed-in user', async () => {
    const providedEmail = 'test2@test.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'Test2',
        email: providedEmail,
        phone: '9876543211',
        password: 'qwerty!123',
        confirmPassword: 'qwerty!123',
      })
      .expect(201);

    const cookie = res.get('Set-Cookie');
    // Option 1
    const { body } = await request(app.getHttpServer())
      .get('/auth/current-user')
      .set('Cookie', cookie)
      .expect(200);
    const { email } = body;
    expect(email).toEqual(providedEmail);

    // Option 2
    // return request(app.getHttpServer())
    //   .get('/auth/current-user')
    //   .set('Cookie', cookie)
    //   .expect(200)
    //   .then((res) => {
    //     const { email } = res.body;
    //     expect(email).toEqual(providedEmail);
    //   });
  });
});
