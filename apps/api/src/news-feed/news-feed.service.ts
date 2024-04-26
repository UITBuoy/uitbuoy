import { PaginationArgs } from '@/common/args/pagination.arg';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SeService } from './crawl/se.service';
import { UITNewsService } from './crawl/uit-news.service';
import { NewsFeed } from './entities/news-feed.entity';

@Injectable()
export class NewsFeedService {
    constructor(
        @InjectRepository(NewsFeed) private readonly repo: Repository<NewsFeed>,
        private readonly seService: SeService,
        private readonly uitNewsService: UITNewsService,
    ) {}

    async crawlData(startPage: number = 0, pageNum: number = 1) {
        await this.seService.crawlData(startPage, pageNum);
        await this.uitNewsService.crawlData(startPage, pageNum);
    }

    async findOne(id: string) {
        return this.repo.findOne({
            where: { id },
            relations: { tags: true, files: true },
        });
    }

    async findAll(tags: string[], paginationArgs: PaginationArgs) {
        return this.repo.find({
            where: {
                ...(tags.length ? { tags: { name: In(tags) } } : {}),
            },
            relations: { tags: true, files: true },
            order: { date: 'desc' },
            skip: paginationArgs.skip,
            take: paginationArgs.limit,
        });
    }
}
