import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsFeed } from '../entities/news-feed.entity';
import { getSeData } from '../utils/get-se-data';

@Injectable()
export class SeService {
    private readonly baseUrl = 'https://se.uit.edu.vn';
    private readonly defaultTag = 'Kỹ thuật phần mềm';
    private readonly url = [
        {
            tags: ['Học vụ'],
            url: (i: number) =>
                `https://se.uit.edu.vn/tin-tuc/thong-bao-hoc-vu.html?option=com_ajax&plugin=particle&Itemid=106&id=contentarray-3072&start=${i * 4}&format=json`,
        },
        {
            tags: ['Tuyển dụng'],
            url: (i: number) =>
                `https://se.uit.edu.vn/tin-tuc/hoc-bong-tuyen-dung.html?option=com_ajax&plugin=particle&Itemid=107&id=contentarray-8823&start=${i * 4}&format=json`,
        },
        {
            tags: ['Sự kiện'],
            url: (i: number) =>
                `https://se.uit.edu.vn/tin-tuc/su-kien-noi-bat.html?option=com_ajax&plugin=particle&Itemid=105&id=contentarray-9445&start=${i * 4}&format=json`,
        },
        {
            tags: ['Khoa học - Công nghệ'],
            url: (i: number) =>
                `https://se.uit.edu.vn/tin-tuc/khoa-hoc-cong-nghe.html?option=com_ajax&plugin=particle&Itemid=108&id=contentarray-1296&start=${i * 4}&format=json`,
        },
    ];

    constructor(
        @InjectRepository(NewsFeed) private readonly repo: Repository<NewsFeed>,
    ) {}

    async crawlData(startPage: number = 0, pageNum: number = 1) {
        const news = [];
        await Promise.all(
            this.url.map(async ({ tags, url }) => {
                news.push(
                    ...(await getSeData(
                        startPage,
                        pageNum,
                        [...tags, this.defaultTag],
                        url,
                        this.baseUrl,
                    )),
                );
            }),
        );

        await this.repo.save(news);
        return true;
    }
}
