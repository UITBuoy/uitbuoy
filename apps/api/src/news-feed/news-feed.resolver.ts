import { PaginationArgs } from '@/common/args/pagination.arg';
import {
    Args,
    Int,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { NewsFeed } from './entities/news-feed.entity';
import { NewsFeedService } from './news-feed.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { NewsFeedTag } from './entities/news-feed-tag.entity';
import { NewsFeedFile } from './entities/news-feed-file';

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
        await this.newsFeedService.crawlData(0, 1);
        return true;
    }

    @Query(() => [NewsFeed], { description: 'Retrieving news feed item' })
    @UseGuards(JwtAuthGuard)
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

    @ResolveField(() => [NewsFeedTag])
    @UseGuards(JwtAuthGuard)
    async tags(@Parent() newsFeed: NewsFeed) {
        return (await this.newsFeedService.findOne(newsFeed.title)).tags;
    }

    @ResolveField(() => [NewsFeedFile])
    @UseGuards(JwtAuthGuard)
    async files(@Parent() newsFeed: NewsFeed) {
        return (await this.newsFeedService.findOne(newsFeed.title)).files;
    }
}
