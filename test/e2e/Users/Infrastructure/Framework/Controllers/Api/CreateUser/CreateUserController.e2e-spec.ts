import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../../../../../../../../src/Shared/Infrastruture/Framework/Controllers/Config/app.module';
import * as request from 'supertest';
import { App } from 'supertest/types';

describe('Create User Controller (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create user api/v1/users POST', () => {
    const payload = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      name: 'John Doe',
    };

    return request(app.getHttpServer())
      .post('/api/v1/users')
      .send(payload)
      .expect(HttpStatus.CREATED);
  });
});
