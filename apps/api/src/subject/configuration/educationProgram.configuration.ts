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
        const typeRegex = /([a-zA-Z])/g;
        const regEx = /(\d.)*(.*)/;

        const subjectIds = Array.from(
            new Set<string>(
                Array.from(text.matchAll(subjectRegex))
                    .map((v) => v[0])
                    .filter((v) => v.length > 4),
            ).values(),
        );
        // console.log(subjectIds);

        const keywords = [
            'Các môn lý luận chính trị',
            'Toán - Tin học - Khoa học tự nhiên',
            'Ngoại ngữ',
            'Giáo dục thể chất - Giáo dục quốc phòng',
            'khác',
            'cơ sở nhóm ngành',
            'cơ sở ngành',
            'tự chọn chuyên ngành',
            'đồ án',
            'Thực tập doanh nghiệp',
            'Khóa luận tốt nghiệp',
            'chuyên đề tốt nghiệp',
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
                    deepMajor: [],
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

        //get subjects by type (dai cuong)
        const tableLength = $data('table').eq(1).find('tr').length;
        for (let j = 0; j < courses[0].majors.length; j++) {
            for (let i = 1; i < tableLength; i++) {
                let textIndex = $data('table')
                    .eq(1)
                    .find('tr')
                    .eq(i)
                    .find('td')
                    .eq(0)
                    .text()
                    .trim();
                const columnContent = $data('table')
                    .eq(1)
                    .find('tr')
                    .eq(i)
                    .find('td')
                    .eq(0)
                    .text();
                if (columnContent.match(typeRegex)) {
                    courses[0].majors[j].subjects.push({
                        name: textIndex,
                        subjects: [],
                    });
                } else {
                    const code = $data('table')
                        .eq(1)
                        .find('tr')
                        .eq(i)
                        .find('td')
                        .eq(1)
                        .text()
                        .trim();
                    if (code.match(subjectRegex)) {
                        courses[0].majors[j].subjects
                            .at(-1)
                            .subjects.push(code);
                    }
                }
            }
        }

        //get subjects by orther types
        let typeTitles = '';
        const titleLength = $data('*').filter('h3').length;
        for (let i = 0; i < titleLength; i++) {
            console.log($data('h3').eq(1).next('table').html());

            const orthertableLength = $data('h3')
                .eq(i)
                .next('table')
                .find('tr').length;

            const title = $data('h3').eq(i).text();

            if (title) {
                typeTitles = title.match(regEx)?.at(2).split(':').at(0);
                courses[0].majors[7].subjects.push({
                    name: typeTitles,
                    subjects: [],
                });

                for (let j = 1; j < orthertableLength; j++) {
                    const code = $data('h3')
                        .eq(i)
                        .next('table')
                        .find('tr')
                        .eq(j)
                        .find('td')
                        .eq(1)
                        .text()
                        .trim();

                    if (code.match(subjectRegex)) {
                        courses[0].majors[7].subjects
                            .at(-1)
                            .subjects.push(code);
                    }
                }
            }
        }

        // const otherType = $data('h3').eq(0).text();

        // const otherTypeStr = otherType.match(regEx)?.at(2);

        // console.log(otherTypeStr);
        // console.log(otherType);

        // console.log(JSON.stringify(courses[0].majors[7], null, 2));

        console.log('??k?');

        // console.log(subjectIdDaiCuong);
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
