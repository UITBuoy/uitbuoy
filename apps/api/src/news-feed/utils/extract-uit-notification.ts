import { trimString } from '@/common/utils/string';
import axios from 'axios';
import { load } from 'cheerio';
import { NewsFeed } from '../entities/news-feed.entity';
import { DeepPartial } from 'typeorm';

export async function extractUitNotification(
    url: string,
): Promise<DeepPartial<NewsFeed>> {
    const $ = load((await axios.get(url)).data);
    const $article = load($('article').html());

    const htmlContent = $article('.field-type-text-with-summary').html();
    const plainContent = trimString(
        $article('.field-type-text-with-summary').text(),
    );

    const files = [];
    $article('.field-name-field-file-dinh-kem a').each((i, el) => {
        const url = $article(el).attr('href');
        const title = $article(el).text();
        files.push({ url, title });
    });

    return { htmlContent, plainContent, files };
}
