import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { NewsFeed } from './entities/news-feed.entity';
import { NewsFeedService } from './news-feed.service';

@Resolver(() => NewsFeed)
export class NewsFeedResolver {
    constructor(private readonly newsFeedService: NewsFeedService) {}

    @Mutation(() => Boolean, {
        description: 'Crawl data for serving news feed',
    })
    async crawlAllNewsFeed(
        @Args('maxPage', {
            nullable: true,
            defaultValue: 5,
            type: () => Int,
            description: 'Max page to crawl data, each page is 4 item',
        })
        maxPage: number,
    ) {
        await this.newsFeedService.crawlData(maxPage);
        return true;
    }

    @Mutation(() => Boolean, {
        description: 'Crawl the most recent news',
    })
    async dailyCrawlNewsFeed() {
        await this.newsFeedService.crawlData(3);
        return true;
    }
}
