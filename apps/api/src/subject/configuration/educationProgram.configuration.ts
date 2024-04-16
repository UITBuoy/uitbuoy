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
                    sections: [],
                });
            }
        }

        function pushCoursesItems(courseIndex: number) {}

        function pushTotalCredit(courseIndex: number, majorIndex: number) {
            const totalCredit = parseInt(
                $data('table')
                    .eq(0)
                    .contents()
                    .children('tr')
                    .last()
                    .children('td')
                    .last()
                    .prev()
                    .text()
                    .trim(),
            );
            courses[courseIndex].majors[majorIndex].totalCredit = isNaN(
                totalCredit,
            )
                ? 0
                : totalCredit;
        }
        function getTextIndex(selectIndex: number, tableIndex: number) {
            return $data('table')
                .eq(1)
                .find('tr')
                .eq(tableIndex)
                .find('td')
                .eq(selectIndex)
                .text()
                .trim();
        }

        function pushGeneralSubjects(courseIndex: number, majorIndex: number) {
            const tableLength = $data('table').eq(1).find('tr').length;

            for (let tableIndex = 1; tableIndex < tableLength; tableIndex++) {
                let textIndex = getTextIndex(0, tableIndex);
                if (textIndex.match(RegEx.typeRegex)) {
                    courses[courseIndex].majors[majorIndex].sections.push({
                        name: textIndex,
                        subjects: [],
                    });
                } else {
                    textIndex = getTextIndex(1, tableIndex);
                    if (textIndex.match(RegEx.subjectRegex)) {
                        courses[courseIndex].majors[majorIndex].sections
                            .at(-1)
                            ?.subjects.push({
                                code: textIndex,
                            });
                    }
                }
            }
        }

        function pushSpecialMajor(courseIndex: number, majorIndex: number) {
            let typeTitles = '';
            const typeNumbers = $data('*').filter('h3').length;
            let tableElement = null;
            for (let typeIndex = 0; typeIndex < typeNumbers; typeIndex++) {
                tableElement = $data('h3')
                    .eq(typeIndex)
                    .nextAll('table')
                    .first();

                const tableElementLength = tableElement.find('tr').length;

                const title = $data('h3').eq(typeIndex).text();

                if (title) {
                    typeTitles = title
                        .match(RegEx.multitypeRegex)
                        ?.at(2)
                        .split(':')
                        .at(0);
                    courses[courseIndex].majors[majorIndex].sections.push({
                        name: typeTitles,
                        subjects: [],
                    });

                    for (
                        let tableElementIndex = 1;
                        tableElementIndex < tableElementLength;
                        tableElementIndex++
                    ) {
                        const code = tableElement
                            .find('tr')
                            .eq(tableElementIndex)
                            .find('td')
                            .eq(1)
                            .text()
                            .trim();

                        if (code.match(RegEx.subjectRegex)) {
                            courses[courseIndex].majors[majorIndex].sections
                                .at(-1)
                                .subjects.push({ code });
                        }
                    }
                }
            }
        }

        async function getEducationProgramMajorElement(
            majorIndex: number,
            element: string,
            courseIndex: number,
        ) {
            const $fieldRoot = await getPayload(
                `${API_URL.headLink}${courses[courseIndex].majors[majorIndex].link}`,
            );
            const html = (await $fieldRoot(element).html()) || '';

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
                    courses &&
                    courses[courseIndex] &&
                    courses[courseIndex].majors &&
                    courses[courseIndex].majors[majorIndex] &&
                    courses[courseIndex].majors[majorIndex].link
                ) {
                    $data = await getEducationProgramMajorElement(
                        majorIndex,
                        'dd:nth-child(6)',
                        courseIndex,
                    );

                    //get total credit
                    pushTotalCredit(courseIndex, majorIndex);

                    //get subjects by type (dai cuong)
                    if (
                        courses &&
                        courses[courseIndex] &&
                        courses[courseIndex].majors &&
                        courses[courseIndex].majors[majorIndex] &&
                        courses[courseIndex].majors[majorIndex].link &&
                        courses[courseIndex].majors[majorIndex].sections
                    )
                        pushGeneralSubjects(courseIndex, majorIndex);

                    //get subjects by orther types
                    pushSpecialMajor(courseIndex, majorIndex);
                }
            }
        }

        console.log(JSON.stringify(courses[0].majors, null, 2));

        courses.forEach((course) => {
            course.majors.forEach(async (major) => {
                major.year = course.course;
                try {
                    await this.repo.save(major);
                } catch (error) {
                    console.log({ major });
                }
            });
        });

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
