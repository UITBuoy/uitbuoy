import { Injectable } from '@nestjs/common';
import { SeService } from './crawl/se.service';

@Injectable()
export class NewsFeedService {
    constructor(private readonly seService: SeService) {}

    async crawlData(maxPage: number) {
        await this.seService.crawlData(maxPage);
    }
}
