import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as cheerio from 'cheerio';
import API_URL from 'src/common/constants/url';
import RegEx from 'src/common/constants/regex';
import { Repository } from 'typeorm';
import { EducationProgram } from '../entities/educationProgram.entity';

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

        let $data = null;

        function pushMajorItems(majorLength: number, courseIndex: number) {
            for (let j = 0; j < majorLength; j++) {
                const educationProgramData = $educationProgram('div.panel')
                    .eq(courseIndex)
                    .children('div')
                    .eq(j)
                    .children('a');
                const majorName = educationProgramData.text();
                const link: string = educationProgramData.attr('href');
                courses[courseIndex].majors.push({
                    majorName,
                    link,
                    totalCredit: '',
                    deepMajor: [],
                    subjects: [],
                });
            }
        }

        function pushCoursesItems(courseIndex: number) {}

        function pushTotalCredit(courseIndex: number, majorIndex: number) {
            courses[0].majors[majorIndex].totalCredit = $data('table')
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

        function pushGeneralSubjects(courseIndex: number, majorIndex: number) {
            const tableLength = $data('table').eq(1).find('tr').length;

            for (let tableIndex = 1; tableIndex < tableLength; tableIndex++) {
                let selectIndex = 0;
                function getTextIndex(selectIndex) {
                    return $data('table')
                        .eq(1)
                        .find('tr')
                        .eq(tableIndex)
                        .find('td')
                        .eq(selectIndex)
                        .text()
                        .trim();
                }
                if (getTextIndex(selectIndex).match(RegEx.typeRegex)) {
                    courses[0].majors[majorIndex].subjects.push({
                        name: getTextIndex(selectIndex),
                        subjects: [],
                    });
                } else {
                    selectIndex = 1;

                    if (getTextIndex(selectIndex).match(RegEx.subjectRegex)) {
                        courses[0].majors[majorIndex].subjects
                            .at(-1)
                            .subjects.push(getTextIndex(selectIndex));
                    }
                }
            }
        }

        function pushSpecialMajor(courseIndex: number, majorIndex: number) {
            let typeTitles = '';
            const titleLength = $data('*').filter('h3').length;
            let tableElement = null;
            for (let t = 0; t < titleLength; t++) {
                tableElement = $data('h3').eq(t).nextAll('table').first();

                const othertableLength = tableElement.find('tr').length;

                const title = $data('h3').eq(t).text();

                if (title) {
                    typeTitles = title
                        .match(RegEx.multitypeRegex)
                        ?.at(2)
                        .split(':')
                        .at(0);
                    courses[0].majors[7].subjects.push({
                        name: typeTitles,
                        subjects: [],
                    });

                    for (let m = 1; m < othertableLength; m++) {
                        const code = tableElement
                            .find('tr')
                            .eq(m)
                            .find('td')
                            .eq(1)
                            .text()
                            .trim();

                        if (code.match(RegEx.subjectRegex)) {
                            courses[0].majors[7].subjects
                                .at(-1)
                                .subjects.push(code);
                        }
                    }
                }
            }
        }

        async function getEducationProgramMajorElement(
            majorIndex: number,
            element: string,
        ) {
            const $fieldRoot = await getPayload(
                `${API_URL.headLink}${courses[0].majors[majorIndex].link}`,
            );
            const html = $fieldRoot(element).html();

            return cheerio.load(html);
        }

        //push courses
        for (let courseIndex = 0; courseIndex < courseLength; courseIndex++) {
            const courseName = $educationProgram('div.accordion')
                .eq(courseIndex)
                .text();
            courses.push({ course: courseName, majors: [] });

            const majorLength = $educationProgram('div.acc-item')
                .eq(courseIndex)
                .children('div.panel')
                .children('div.views-row').length;

            pushMajorItems(majorLength, courseIndex);

            for (let majorIndex = 0; majorIndex < majorLength; majorIndex++) {
                if (
                    courses[0] &&
                    courses[0].majors[majorIndex] &&
                    courses[0].majors[majorIndex].link
                ) {
                    $data = await getEducationProgramMajorElement(
                        majorIndex,
                        'dd:nth-child(6)',
                    );

                    //get total credit
                    pushTotalCredit(courseIndex, majorIndex);

                    //get subjects by type (dai cuong)
                    pushGeneralSubjects(courseIndex, majorIndex);

                    //get subjects by orther types
                    pushSpecialMajor(courseIndex, majorIndex);
                }
            }
        }

        console.log(JSON.stringify(courses[0].majors[7], null, 2));

        console.log('??k?');
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
