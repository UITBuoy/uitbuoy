import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync } from 'node:fs';
export class FetchSubjectData {
    static async fetch() {
        const response = await axios.get(
            'https://student.uit.edu.vn/danh-muc-mon-hoc-dai-hoc',
        );

        const html = response.data;

        const $ = cheerio.load(html);

        const subjects = [];

        const table = $('table.tablesorter tr').slice(1); // this html has 2 table elements

        function childrenOption(child, index) {
            return $(child[index]).text();
        }

        function handleMultiChildren(child, index) {
            return $(child[index])
                .contents()
                .filter((i, value) => value.type == 'text')
                .toArray()
                .map((value) => $(value).text());
        }

        function handleImgChildren(child, index) {
            const $child = $(child[index]).children('img').first();
            if ($child.attr('alt') == 'Hiện không còn mở') return false;
            else if ($child.attr('alt') == 'Hiện đang mở') return true;
            else return null;
        }

        table.each(function (index, element) {
            const children = element.children;

            subjects.push({
                index: parseInt(childrenOption(children, 0)),
                code: childrenOption(children, 1),
                nameVN: childrenOption(children, 2),
                nameEN: childrenOption(children, 3),
                isActive: handleImgChildren(children, 4),
                department: childrenOption(children, 5),
                type: childrenOption(children, 6),
                oldCode: childrenOption(children, 7),
                equivalentCode: handleMultiChildren(children, 8),
                requiredCode: handleMultiChildren(children, 9),
                previousCode: handleMultiChildren(children, 10),
                theoriticalCredit: parseInt(childrenOption(children, 11)),
                practialCredit: parseInt(childrenOption(children, 12)),
            });
        });

        writeFileSync('./data.json', JSON.stringify(subjects), { flag: 'w' });
        console.log('Done');
    }
}
