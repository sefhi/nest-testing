import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../src/Shared/Infrastruture/Framework/Controllers/app.controller';
import { AppService } from '../../src/Shared/Infrastruture/Framework/Controllers/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
