import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../../../../../../../src/Shared/Infrastruture/Framework/Controllers/Config/app.module';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { Uuid } from '../../../../../../../../src/Shared/Domain/ValueObjects/Uuid';

describe('CreateUserController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      /*.overrideProvider(USER_REPOSITORY)
      .useValue(inMemoryUserRepository)*/
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  it('should create user with http status 201', () => {
    const payload = {
      id: Uuid.generate().toString(),
      email: `test-${Uuid.generate().toString().slice(0, 8)}@example.com`,
      name: 'John Doe',
    };

    return request(app.getHttpServer())
      .post('/api/v1/users')
      .send(payload)
      .expect(HttpStatus.CREATED);
  });

  it('should return an error with http status 400', () => {
    const payload = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'testexample.com',
      name: 'John Doe',
    };

    return request(app.getHttpServer())
      .post('/api/v1/users')
      .send(payload)
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        interface ErrorResponse {
          message: string[];
        }
        const responseBody = res.body as ErrorResponse;
        expect(responseBody.message).toEqual(['invalid email format']);
      });
  });
});
