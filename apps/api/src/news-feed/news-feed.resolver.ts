import { Mutation, Resolver } from '@nestjs/graphql';
import { NewsFeed } from './entities/news-feed.entity';
import { NewsFeedService } from './news-feed.service';

@Resolver(() => NewsFeed)
export class NewsFeedResolver {
    constructor(private readonly newsFeedService: NewsFeedService) {}

    @Mutation(() => Boolean, {
        description: 'Crawl data for serving news feed',
    })
    async crawlAllNewsFeed() {
        await this.newsFeedService.crawlData(3);
        return true;
    }
}
