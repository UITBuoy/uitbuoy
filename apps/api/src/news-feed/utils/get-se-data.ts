import axios from 'axios';
import { load } from 'cheerio';
import { extractSeNotification as extractSeNews } from './extract-se-notification';
import { NewsFeed } from '../entities/news-feed.entity';

export async function getSeData(
    maxPage: number = 10,
    tagNames: string[],
    url: (index: number) => string,
    baseUrl = 'https://se.uit.edu.vn',
): Promise<NewsFeed[]> {
    const newsList = [];

    for (let i = 0; i < maxPage; i++) {
        const response = await axios.get(url(i));
        const data = response.data as {
            data: {
                code: number;
                html: string;
                id: string;
            }[];
        };
        const html = decodeURI(data.data[0].html);

        const $ = load(html);

        newsList.push(
            ...(await Promise.all(
                $('.g-grid').map(async (i, el) => {
                    const elementHTML = $(el).html();
                    const newsFeed = await extractSeNews(
                        elementHTML,
                        baseUrl,
                        tagNames,
                    );
                    return newsFeed;
                }),
            )),
        );
    }

    return newsList;
}
