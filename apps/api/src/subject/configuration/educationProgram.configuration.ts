import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as cheerio from 'cheerio';
import RegEx from 'src/common/constants/regex';
import API_URL from 'src/common/constants/url';
import { Repository } from 'typeorm';
import { YearEducationProgram } from '../dto/yearEducationProgram.dto';
import { EducationProgram } from '../entities/educationProgram.entity';
import { SubjectService } from '../services/subject.service';
import SE23 from 'src/common/requiredSubjects/SE23';
import GENERAL from '@/common/requiredSubjects/general';
import { Section } from '../entities/section.entity';

@Injectable()
export class EducationProgramConfiguration {
    // export class EducationProgramConfiguration {
    constructor(
        @InjectRepository(EducationProgram)
        private educationProgramRepo: Repository<EducationProgram>,
        private readonly subjectService: SubjectService,
    ) {}

    async saveEducationProgramData(): Promise<EducationProgram[]> {
        const years = await this.getYearEducationProgram();

        years.forEach((year) => {
            year.majors.forEach(async (major) => {
                const educationProgram = { ...major, year: year.yearName };

                try {
                    await this.educationProgramRepo.save(educationProgram);
                } catch (error) {
                    console.log({ major, error });
                }
            });
        });

        console.log({ years });
        return this.subjectService.findAllEducationProgram();
    }

    async getYearEducationProgram() {
        const years: YearEducationProgram[] = [];

        const $educationProgram = await this.getPayload(
            API_URL.educationPrograms,
        );

        const courseLength = $educationProgram('div.acc-item').length;

        for (let yearIndex = 0; yearIndex < courseLength; yearIndex++) {
            const yearName = $educationProgram('div.accordion')
                .eq(yearIndex)
                .text();
            years.push({ yearName: yearName, majors: [] });

            const majorLength = $educationProgram('div.acc-item')
                .eq(yearIndex)
                .children('div.panel')
                .children('div.views-row').length;

            this.pushMajorItems(
                majorLength,
                yearIndex,
                years,
                $educationProgram,
            );

            for (let majorIndex = 0; majorIndex < majorLength; majorIndex++) {
                if (years?.[yearIndex]?.majors?.[majorIndex]?.link) {
                    const $data = await this.getEducationProgramMajorElement(
                        majorIndex,
                        'dd:nth-child(6)',
                        yearIndex,
                        years,
                    );

                    // get total credit
                    await this.pushTotalCredit(
                        yearIndex,
                        majorIndex,
                        years,
                        $data,
                    );

                    // get subjects by type (dai cuong)
                    if (years?.[yearIndex]?.majors?.[majorIndex]?.sections)
                        await this.pushGeneralSubjects(
                            yearIndex,
                            majorIndex,
                            years,
                            $data,
                        );

                    // get subjects by orther types
                    await this.pushSpecialMajor(
                        yearIndex,
                        majorIndex,
                        years,
                        $data,
                    );
                }
            }
        }

        await this.setIsRequired(years);
        return years;
    }

    async getPayload(url: string) {
        return cheerio.load((await axios.get(url)).data);
    }

    //     let $data = null;

    async pushMajorItems(
        majorLength: number,
        yearIndex: number,
        years: YearEducationProgram[],
        $educationProgram: cheerio.CheerioAPI,
    ) {
        for (let majorIndex = 0; majorIndex < majorLength; majorIndex++) {
            const educationProgramData = $educationProgram('div.panel')
                .eq(yearIndex)
                .children('div')
                .eq(majorIndex)
                .children('a');
            const majorName = educationProgramData.text();
            const link: string = educationProgramData.attr('href');
            years[yearIndex].majors.push({
                majorName,
                link,
                totalCredit: '',
                deepMajor: [],
                sections: [],
            });
        }
    }

    async pushTotalCredit(
        courseIndex: number,
        majorIndex: number,
        years: YearEducationProgram[],
        $data: cheerio.CheerioAPI,
    ) {
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
        years[courseIndex].majors[majorIndex].totalCredit = isNaN(totalCredit)
            ? 0
            : totalCredit;
    }

    async getTextIndex(
        selectIndex: number,
        tableIndex: number,
        $data: cheerio.CheerioAPI,
    ) {
        return $data('table')
            .eq(1)
            .find('tr')
            .eq(tableIndex)
            .find('td')
            .eq(selectIndex)
            .text()
            .trim();
    }

    async pushGeneralSubjects(
        courseIndex: number,
        majorIndex: number,
        years: YearEducationProgram[],
        $data: cheerio.CheerioAPI,
    ) {
        const tableLength = $data('table').eq(1).find('tr').length;

        for (let tableIndex = 1; tableIndex < tableLength; tableIndex++) {
            let textIndex = await this.getTextIndex(0, tableIndex, $data);
            if (textIndex.match(RegEx.typeRegex)) {
                years[courseIndex].majors[majorIndex].sections.push({
                    name: textIndex,
                    subjects: [],
                });
            } else {
                textIndex = await this.getTextIndex(1, tableIndex, $data);
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

    async pushSpecialMajor(
        courseIndex: number,
        majorIndex: number,
        years: YearEducationProgram[],
        $data: cheerio.CheerioAPI,
    ) {
        let typeTitles = '';
        let type = '';
        const typeNumbers = $data('*').filter('h3').length;
        let tableElement = null;
        for (let typeIndex = 0; typeIndex < typeNumbers; typeIndex++) {
            tableElement = $data('h3').eq(typeIndex).nextAll('table').first();

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

    async getEducationProgramMajorElement(
        majorIndex: number,
        element: string,
        courseIndex: number,
        years: YearEducationProgram[],
    ) {
        const $fieldRoot = await this.getPayload(
            `${API_URL.headLink}${years[courseIndex].majors[majorIndex].link}`,
        );
        const html = (await $fieldRoot(element).html()) || '';

        return cheerio.load(html);
    }

    async setIsRequired(years: YearEducationProgram[]) {
        for (let i = 0; i < years.length; i++) {
            for (let j = 0; j < years[i].majors.length; j++) {
                for (let k = 0; k < years[i].majors[j].sections.length; k++) {
                    for (
                        let t = 0;
                        t < years[i].majors[j].sections[k].subjects.length;
                        t++
                    )
                        if (
                            SE23.some((item) => {
                                years[i].majors[j].sections[k].subjects[
                                    t
                                ].code?.match(item);
                            }) ||
                            GENERAL.some((item) => {
                                years[i].majors[j].sections[k].subjects[
                                    t
                                ].code?.match(item);
                            })
                        )
                            years[i].majors[j].sections[k].subjects[
                                t
                            ].isRequired = true;
                }
            }
        }
    }
}
