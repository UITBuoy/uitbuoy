import { Controller, Get } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NewsFeedService } from './news-feed.service';

@Controller({ path: '' })
export class NewsFeedController {
    constructor(private readonly service: NewsFeedService) {}

    @EventPattern('newsfeed.crawl.daily')
    async dailyCrawl() {
        await this.service.crawlData(0, 1);
        return true;
    }

    @EventPattern('newsfeed.crawl.all')
    async crawl(@Payload() message: { start: number; num: number }) {
        await this.service.crawlData(message.start, message.num);
        return true;
    }
}
