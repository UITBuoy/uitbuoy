import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as cheerio from 'cheerio';
import API_URL from 'src/common/constants/url';
import RegEx from 'src/common/constants/regex';
import { Repository } from 'typeorm';
import { EducationProgram } from '../entities/educationProgram.entity';
import { is } from 'cheerio/lib/api/traversing';

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

        const years = [];

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
                years[courseIndex].majors.push({
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
            years[courseIndex].majors[majorIndex].totalCredit = isNaN(
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
                    years[courseIndex].majors[majorIndex].sections.push({
                        name: textIndex,
                        subjects: [],
                    });
                } else {
                    textIndex = getTextIndex(1, tableIndex);
                    if (textIndex.match(RegEx.subjectRegex)) {
                        years[courseIndex].majors[majorIndex].sections
                            .at(-1)
                            ?.subjects.push({
                                code: textIndex,
                                isRequired: true,
                            });
                    }
                }
            }
        }

        function pushSpecialMajor(courseIndex: number, majorIndex: number) {
            let typeTitles = '';
            let type = '';
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
                    years[courseIndex].majors[majorIndex].sections.push({
                        name: typeTitles,
                        subjects: [],
                    });

                    for (
                        let tableElementIndex = 1;
                        tableElementIndex < tableElementLength;
                        tableElementIndex++
                    ) {
                        if (
                            tableElement
                                .find('tr')
                                .eq(tableElementIndex)
                                .find('td')
                                .eq(0)
                                .text()
                                .trim()
                                .match(RegEx.typeRegex || RegEx.subjectRegex)
                        ) {
                            type = tableElement
                                .find('tr')
                                .eq(tableElementIndex)
                                .find('td')
                                .eq(0)
                                .text()
                                .trim();
                        }
                        const code = tableElement
                            .find('tr')
                            .eq(tableElementIndex)
                            .find('td')
                            .eq(1)
                            .text()
                            .trim();

                        if (code.match(RegEx.subjectRegex)) {
                            years[courseIndex].majors[majorIndex].sections
                                .at(-1)
                                .subjects.push({
                                    code,
                                    type,
                                    isRequired: false,
                                });
                        }
                    }
                    type = '';
                }
            }
        }

        async function getEducationProgramMajorElement(
            majorIndex: number,
            element: string,
            courseIndex: number,
        ) {
            const $fieldRoot = await getPayload(
                `${API_URL.headLink}${years[courseIndex].majors[majorIndex].link}`,
            );
            const html = (await $fieldRoot(element).html()) || '';

            return cheerio.load(html);
        }

        //push courses
        for (let yearIndex = 0; yearIndex < courseLength; yearIndex++) {
            const courseName = $educationProgram('div.accordion')
                .eq(yearIndex)
                .text();
            years.push({ course: courseName, majors: [] });

            const majorLength = $educationProgram('div.acc-item')
                .eq(yearIndex)
                .children('div.panel')
                .children('div.views-row').length;

            pushMajorItems(majorLength, yearIndex);

            for (let majorIndex = 0; majorIndex < majorLength; majorIndex++) {
                if (
                    years &&
                    years[yearIndex] &&
                    years[yearIndex].majors &&
                    years[yearIndex].majors[majorIndex] &&
                    years[yearIndex].majors[majorIndex].link
                ) {
                    $data = await getEducationProgramMajorElement(
                        majorIndex,
                        'dd:nth-child(6)',
                        yearIndex,
                    );

                    //get total credit
                    pushTotalCredit(yearIndex, majorIndex);

                    //get subjects by type (dai cuong)
                    if (
                        years &&
                        years[yearIndex] &&
                        years[yearIndex].majors &&
                        years[yearIndex].majors[majorIndex] &&
                        years[yearIndex].majors[majorIndex].link &&
                        years[yearIndex].majors[majorIndex].sections
                    )
                        pushGeneralSubjects(yearIndex, majorIndex);

                    //get subjects by orther types
                    pushSpecialMajor(yearIndex, majorIndex);
                }
            }
        }

        for (let i = 0; i < years.length; i++) {
            for (let j = 0; j < years[i].majors.length; j++) {
                for (let k = 0; k < years[i].majors[j].sections.length; k++) {
                    if (
                        years[i].majors[j].sections[k].name?.match(/khác/i) ||
                        years[i].majors[j].sections[k].name?.match(/đồ án/i) ||
                        years[i].majors[j].sections[k].name?.match(/thực tập/i)
                    )
                        for (
                            let t = 0;
                            t < years[i].majors[j].sections[k].subjects.length;
                            t++
                        )
                            years[i].majors[j].sections[k].subjects[
                                t
                            ].isRequired = true;
                    for (
                        let t = 0;
                        t < years[i].majors[j].sections[k].subjects.length;
                        t++
                    )
                        if (
                            years[i].majors[j].sections[k].subjects[
                                t
                            ].type?.match(/bắt buộc/i)
                        )
                            years[i].majors[j].sections[k].subjects[
                                t
                            ].isRequired = true;
                }
            }
        }

        years.forEach((year) => {
            year.majors.forEach(async (major) => {
                major.year = year.course;

                // setIsRequired(year);
                try {
                    await this.repo.save(major);
                } catch (error) {
                    console.log({ major });
                }
            });
        });

        console.log(JSON.stringify(years[0].majors[7], null, 2));

        console.log('??k?');
    }
}
