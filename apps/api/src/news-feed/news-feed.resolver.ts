import { PaginationArgs } from '@/common/args/pagination.arg';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewsFeed } from './entities/news-feed.entity';
import { NewsFeedService } from './news-feed.service';

@Resolver(() => NewsFeed)
export class NewsFeedResolver {
    constructor(private readonly newsFeedService: NewsFeedService) {}

    @Mutation(() => Boolean, {
        description: 'Crawl data for serving news feed',
    })
    async crawlAllNewsFeed(
        @Args('startPage', {
            nullable: true,
            defaultValue: 0,
            type: () => Int,
            description: 'Default page to crawl data',
        })
        startPage: number,
        @Args('pageNum', {
            nullable: true,
            defaultValue: 5,
            type: () => Int,
            description: 'Max page to crawl data, each page is 4 item',
        })
        pageNum: number,
    ) {
        await this.newsFeedService.crawlData(startPage, pageNum);
        return true;
    }

    @Mutation(() => Boolean, {
        description: 'Crawl the most recent news',
    })
    async dailyCrawlNewsFeed() {
        await this.newsFeedService.crawlData(0, 2);
        return true;
    }

    @Query(() => [NewsFeed], { description: 'Retrieving news feed item' })
    async newsFeed(
        @Args() paginationArgs: PaginationArgs,
        @Args('tags', {
            nullable: true,
            description: 'List of name of the tag to find',
            type: () => [String],
            defaultValue: [],
        })
        tags: string[],
    ) {
        const news = await this.newsFeedService.findAll(tags, paginationArgs);
        return news;
    }
}
