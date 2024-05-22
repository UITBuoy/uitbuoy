import { Controller, Get } from '@nestjs/common';
import { LoggingService } from './logging.service';

@Controller()
export class LoggingController {
  constructor(private readonly loggingService: LoggingService) {}

  @Get()
  getHello(): string {
    return this.loggingService.getHello();
  }
}
