import { Injectable } from '@nestjs/common';
import { SeService } from './crawl/se.service';
import { UITNewsService } from './crawl/uit-news.service';

@Injectable()
export class NewsFeedService {
    constructor(
        private readonly seService: SeService,
        private readonly uitNewsService: UITNewsService,
    ) {}

    async crawlData(startPage: number = 0, pageNum: number = 1) {
        await this.seService.crawlData(startPage, pageNum);
        await this.uitNewsService.crawlData(startPage, pageNum);
    }
}
