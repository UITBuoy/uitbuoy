import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Query, Resolver } from '@nestjs/graphql';
import { EventPattern, Payload } from '@nestjs/microservices';
import { LogMessage } from './LogMessage.dto';

@Controller({ path: '' })
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/')
    getHello(): string {
        return 'Logger service';
    }

    @EventPattern('log')
    log(@Payload() message: LogMessage) {
        this.appService.log(message.level, message.message, {
            service: message.service,
            ...message.meta,
        });
    }
}
