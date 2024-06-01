import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeService } from './crawl/se.service';
import { UITNewsService } from './crawl/uit-news.service';
import { NewsFeedFile } from './entities/news-feed-file';
import { NewsFeedTag } from './entities/news-feed-tag.entity';
import { NewsFeed } from './entities/news-feed.entity';
import { NewsFeedResolver } from './news-feed.resolver';
import { NewsFeedService } from './news-feed.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        TypeOrmModule.forFeature([NewsFeed, NewsFeedTag, NewsFeedFile]),
        ClientsModule.register([
            {
                name: 'NEWS_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'news-feed-crawler',
                        brokers: ['localhost:29092'],
                    },
                    consumer: {
                        groupId: 'news-feed-crawler-consumer',
                    },
                },
            },
        ]),
    ],
    providers: [NewsFeedResolver, NewsFeedService, SeService, UITNewsService],
})
export class NewsFeedModule {}
