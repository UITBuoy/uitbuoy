import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as cheerio from 'cheerio';
import API_URL from 'src/common/constants/url';
import { Repository } from 'typeorm';
import { EducationProgram } from '../entities/educationProgram.entity';
import { writeFile } from 'fs';
import { table } from 'console';

@Injectable()
export class EducationProgramConfiguration implements OnApplicationBootstrap {
    // export class EducationProgramConfiguration {
    constructor(
        @InjectRepository(EducationProgram)
        private repo: Repository<EducationProgram>,
    ) {}
    async onApplicationBootstrap() {
        async function getPayload(url: string) {
            return cheerio.load((await axios.get(url)).data);
        }
        const $educationProgram = await getPayload(API_URL.educationPrograms);
        const courses = [];

        const courseLength: number = $educationProgram('div.acc-item').length;

        let link =
            'https://daa.uit.edu.vn/content/cu-nhan-nganh-ky-thuat-phan-mem-ap-dung-tu-khoa-18-2023';
        const $root = await getPayload(link);
        const html = $root('dd:nth-child(6)').html();
        const $data = cheerio.load(html);

        // get subject
        const text = $data('td').text();
        writeFile('test.txt', text, () => {});

        const subjectRegex = /([a-zA-Z]+\d+)/g;
        const subjectIds = Array.from(
            new Set<string>(
                Array.from(text.matchAll(subjectRegex))
                    .map((v) => v[0])
                    .filter((v) => v.length > 4),
            ).values(),
        );
        // console.log(subjectIds);

        const keywords = [
            'đại cương',
            'cơ sở ngành',
            'chuyên ngành',
            'cơ sở nhóm ngành',
            'môn học khác',
            'thực tập',
            'đồ án',
            'khoá luận',
            'chuyên đề',
        ];

        //push courses
        for (let i = 0; i < courseLength; i++) {
            const courseName = $educationProgram('div.accordion').eq(i).text();
            courses.push({ course: courseName, majors: [] });

            const majorLength: number = $educationProgram('div.acc-item')
                .eq(i)
                .children('div.panel')
                .children('div.views-row').length;

            for (let j = 0; j < majorLength; j++) {
                const majorName = $educationProgram('div.panel')
                    .eq(i)
                    .children('div')
                    .eq(j)
                    .children('a')
                    .text();
                const link: string = $educationProgram('div.panel')
                    .eq(i)
                    .children('div')
                    .eq(j)
                    .children('a')
                    .attr('href');
                courses[i].majors.push({
                    majorName,
                    link,
                    totalCredit: '',
                    subjects: [],
                });
            }
            //get total credit
            for (let j = 0; j < majorLength; j++) {
                if (
                    courses[0] &&
                    courses[0].majors[j] &&
                    courses[0].majors[j].link
                ) {
                    const $fieldRoot = await getPayload(
                        `https://daa.uit.edu.vn${courses[0].majors[j].link}`,
                    );
                    const table = $fieldRoot('dd:nth-child(6)').html(); //gia tri nay truyen vao
                    const $getTotalCredit = cheerio.load(table);
                    courses[0].majors[j].totalCredit = $getTotalCredit('table')
                        .eq(0)
                        .contents()
                        .children('tr')
                        .last()
                        .children('td')
                        .last()
                        .prev()
                        .text()
                        .trim();
                }
            }
        }

        // for (let i = 0; i < courses.length; i++) {
        //     const $fieldRoot = await getPayload(courses[0].majors[7].link);
        //     const table = $fieldRoot('dd:nth-child(6)').html(); //gia tri nay truyen vao
        //     const $getTotalCredit = cheerio.load(table);
        //     courses[0].majors[7].totalCredit = $educationProgram('table')
        //         .eq(0)
        //         .contents()
        //         .children('tr')
        //         .last()
        //         .children('td')
        //         .last()
        //         .prev()
        //         .text();
        // }
        console.log('???');
        console.log(JSON.stringify(courses[0].majors, null, 2));

        // console.log(JSON.stringify(courses, null, 2));

        // console.log('?');
        // const totalCredit = $data('table')
        //     .eq(0)
        //     .contents()
        //     .children('tr')
        //     .last()
        //     .children('td')
        //     .last()
        //     .prev()
        //     .text();
        // console.log(totalCredit);
        // console.log('?de');

        // const title = $data('table').eq(0).html()
        // console.log($data('h2').eq(0).nextAll('table').first().text());

        for (let i = 0; i < subjectIds.length; i++) {
            // .parentsUntil('table')
            // .prevUntil('*')
            // .filter(function (i, el) {
            //     for (let j = 0; j < keywords.length; j++) {
            //         if ($data(el).text().includes(keywords[j])) {
            //             t = keywords[j];
            //             condition = 'true';
            //             return true;
            //         }
            //     }
            // });
            // if (condition == 'true') {
            //     console.log('j');
            //     courses[0].majors[7].subjects.push({
            //         subjectCode: subjectIds[i],
            //         type: t,
            //     });
            //     break;
            // }
        }
        // console.log('working');
        // console.log('done');

        // for (let i = 0; i < courses.length; i++) {
        // //     for (let j = 0; j < courses[i].majors.length; j++) {
        // let link = `https://daa.uit.edu.vn/${courses[0].majors[7].link}`;
        // const $data = await getPayload(link);
        // const text = $data('dd:nth-child(6)').text();

        // const subjectIds = Array.from(text.matchAll(/[a-zA-Z]+\d+/g));
        // console.log(subjectIds);

        // for (let k = 0; k < 4; k++)
        // const partOfText = 'dục đại cương';
        // for (let i = 0; i < 150; i++) {
        // const text = $data('dd:nth-child(6)').text()
        // writeFile('test.txt', text, () => {})

        // const trainingSystem = $data(':has(a[name=\'_Toc106488670\'])')
        //     .nextUntil(':has(a[name=\'_Toc106488673\'])')
        //     .filter('table')
        //     .text();

        // console.log(trainingSystem);
        // }
        // }
        //     }
        // }
    }
    //once per 6 months
    @Cron('0 0 0 1 6 *') // Remember to test later (13/3/24)
    async cron() {
        async function getPayload(url: string) {
            return cheerio.load((await axios.get(url)).data);
        }
        const $educationProgram = await getPayload(API_URL.educationPrograms);

        const test = $educationProgram('div#accordion active').text();
        console.log(test);
        // this.repo.save();

        console.log('done');
    }
}
