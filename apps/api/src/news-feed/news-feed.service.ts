import { Injectable } from '@nestjs/common';
import { SeService } from './crawl/se.service';
import { UITNewsService } from './crawl/uit-news.service';

@Injectable()
export class NewsFeedService {
    constructor(
        private readonly seService: SeService,
        private readonly uitNewsService: UITNewsService,
    ) {}

    async crawlData(maxPage: number) {
        await this.seService.crawlData(maxPage);
        await this.uitNewsService.crawlData(maxPage);
    }
}
