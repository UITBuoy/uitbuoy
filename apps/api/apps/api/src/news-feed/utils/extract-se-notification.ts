import { trimString } from '@/common/utils/string';
import axios from 'axios';
import { load } from 'cheerio';
import { NewsFeedTag } from '../entities/news-feed-tag.entity';
import { NewsFeed } from '../entities/news-feed.entity';

export async function extractSeNotification(
    html: string,
    baseUrl: string,
    tagNames: string[],
): Promise<
    Omit<NewsFeed, 'id' | 'tags' | 'files'> & {
        tags: Pick<NewsFeedTag, 'name'>[];
    }
> {
    const $element = load(html);

    const title = trimString($element('.g-item-title').text());
    const date = new Date(
        trimString($element('.g-array-item-date').text())
            .split(',')
            .slice(1, 3)
            .join(','),
    );
    const view = parseInt(
        trimString($element('.g-array-item-hits').text()),
        10,
    );
    const description = trimString($element('.g-array-item-text').text());

    const link = baseUrl + $element('.g-item-title > a').attr('href');

    const $content = load((await axios.get(link)).data);

    const htmlContent = $content('.com-content-article__body').html();
    const plainContent = trimString(
        $content('.com-content-article__body').text(),
    );

    const imgSrc = $content('.item-image > img').attr('src');

    return {
        title,
        date: date.getTime(),
        view,
        description,
        htmlContent,
        plainContent,
        link,
        imageUrl: imgSrc ? baseUrl + imgSrc : undefined,
        tags: [...tagNames.map((name) => ({ name }))],
    };
}
