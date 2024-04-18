import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { load } from 'cheerio';
import { Repository } from 'typeorm';
import { NewsFeed } from '../entities/news-feed.entity';
import { extractDateFromCreatedDateString } from '../utils/converter';
import { extractUitNotification } from '../utils/extract-uit-notification';

@Injectable()
export class UITNewsService {
    private readonly baseUrl = 'https://student.uit.edu.vn';

    constructor(
        @InjectRepository(NewsFeed) private readonly repo: Repository<NewsFeed>,
    ) {}

    async crawlData(maxPage: number = 1) {
        const news = [];

        for (let i = 0; i < maxPage; i++) {
            const url = `https://student.uit.edu.vn/thong-bao-chung?page=${i}`;

            const $ = load((await axios.get(url)).data);
            const mainHTML = $('#content-body').html();

            const $main = load(mainHTML);

            await Promise.all(
                $main('article').map(async (i, el) => {
                    const articleHTML = $main(el).html();
                    const $article = load(articleHTML);

                    const title = $article('h2 > a').text();
                    const link = this.baseUrl + $article('h2 > a').attr('href');
                    const date = extractDateFromCreatedDateString(
                        $article('.submitted').text(),
                    );
                    const { htmlContent, plainContent, files } =
                        await extractUitNotification(link);

                    news.push({
                        title,
                        date: date.getTime(),
                        htmlContent,
                        plainContent,
                        link,
                        files,
                    });
                }),
            );
        }

        await this.repo.save(news);
        return true;
    }
}
