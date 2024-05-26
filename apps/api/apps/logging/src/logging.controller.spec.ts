import { Test, TestingModule } from '@nestjs/testing';
import { LoggingController } from './logging.controller';
import { LoggingService } from './logging.service';

describe('LoggingController', () => {
  let loggingController: LoggingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LoggingController],
      providers: [LoggingService],
    }).compile();

    loggingController = app.get<LoggingController>(LoggingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(loggingController.getHello()).toBe('Hello World!');
    });
  });
});
