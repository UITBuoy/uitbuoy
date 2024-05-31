import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Query, Resolver } from '@nestjs/graphql';
import { EventPattern } from '@nestjs/microservices';

@Controller({ path: '' })
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/')
    getHello(): string {
        return this.appService.getHello();
    }

    @EventPattern('course.crawl')
    crawlCourse(data: any) {
        console.log({ data });
        return data;
    }
}

@Resolver()
export class AppResolver {
    @Query(() => String)
    main() {
        return '';
    }
}
