import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeService } from './crawl/se.service';
import { NewsFeed } from './entities/news-feed.entity';
import { NewsFeedResolver } from './news-feed.resolver';
import { NewsFeedService } from './news-feed.service';
import { NewsFeedTag } from './entities/news-feed-tag.entity';

@Module({
    imports: [TypeOrmModule.forFeature([NewsFeed, NewsFeedTag])],
    providers: [NewsFeedResolver, NewsFeedService, SeService],
})
export class NewsFeedModule {}
