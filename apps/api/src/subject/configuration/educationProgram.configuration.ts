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
import { CrawlArgs } from '@/common/args/crawl.arg';
import ELEMENTS from '@/common/constants/elements';
import { SectionEducationProgram } from '../dto/sectionEducationPro';
import YEARS from '@/common/elements/years';

@Injectable()
export class EducationProgramConfiguration {
    // export class EducationProgramConfiguration {
    constructor(
        @InjectRepository(EducationProgram)
        private educationProgramRepo: Repository<EducationProgram>,
        private readonly subjectService: SubjectService,
    ) {}

    async saveEducationProgramData(
        crawlArgs: CrawlArgs,
    ): Promise<EducationProgram[]> {
        const getYear = crawlArgs.years;
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

        const yearElement = Object.values(YEARS).reverse();

        const $educationProgram = await this.getPayload(
            API_URL.educationPrograms,
        );

        const courseLength = $educationProgram(ELEMENTS.yearElement).length;

        for (let yearIndex = 0; yearIndex < courseLength; yearIndex++) {
            const yearName = $educationProgram(ELEMENTS.yearName)
                .eq(yearIndex)
                .text();
            years.push({ yearName: yearName, majors: [] });

            const majorLength = $educationProgram(ELEMENTS.yearElement)
                .eq(yearIndex)
                .children(ELEMENTS.majorList)
                .children(ELEMENTS.majorElement).length;

            this.pushMajorItems(
                majorLength,
                yearIndex,
                years,
                $educationProgram,
            );

            for (let majorIndex = 0; majorIndex < majorLength; majorIndex++) {
                if (years?.[yearIndex]?.majors?.[majorIndex]?.link) {
                    console.log(years[yearIndex].majors[majorIndex].link);
                    console.log(yearIndex);
                    const $data = await this.getEducationProgramMajorElement(
                        yearElement?.[yearIndex], //moi nam moi khac
                        years[yearIndex].majors[majorIndex].link,
                    );

                    // get total credit
                    await this.pushTotalCredit(
                        yearIndex,
                        majorIndex,
                        years,
                        $data,
                    );

                    // get subjects by type (dai cuong)
                    if (years?.[yearIndex]?.majors?.[majorIndex]?.sections) {
                        await this.pushGeneralSubjects(
                            years[yearIndex].majors[majorIndex].sections,
                            $data,
                        );

                        // get subjects by orther types
                        await this.pushSpecialMajor(
                            years[yearIndex].majors[majorIndex].sections,
                            $data,
                        );
                    }
                }
            }
        }

        await this.setIsRequired(years);
        return years;
    }
    async getEducationProgramMajorElement(element: string, link: string) {
        const $fieldRoot = await this.getPayload(`${API_URL.headLink}${link}`);
        const html = $fieldRoot(element).html() || '';
        if (html == '') console.log({ html });
        return cheerio.load(html);
    }

    async getPayload(url: string) {
        return cheerio.load((await axios.get(url)).data);
    }

    async pushMajorItems(
        majorLength: number,
        yearIndex: number,
        years: YearEducationProgram[],
        $educationProgram: cheerio.CheerioAPI,
    ) {
        for (let majorIndex = 0; majorIndex < majorLength; majorIndex++) {
            const educationProgramData = $educationProgram(ELEMENTS.majorList)
                .eq(yearIndex)
                .children(ELEMENTS.div)
                .eq(majorIndex)
                .children(ELEMENTS.a);
            const majorName = educationProgramData.text();
            const link: string = educationProgramData.attr(ELEMENTS.href);
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
        yearIndex: number,
        majorIndex: number,
        years: YearEducationProgram[],
        $data: cheerio.CheerioAPI,
    ) {
        const totalCredit = parseInt(
            $data(ELEMENTS.table)
                .eq(0)
                .contents()
                .children(ELEMENTS.tr)
                .last()
                .children(ELEMENTS.td)
                .last()
                .prev()
                .text()
                .trim(),
        );
        years[yearIndex].majors[majorIndex].totalCredit = isNaN(totalCredit)
            ? 0
            : totalCredit;
    }

    async getTextIndex(
        selectIndex: number,
        tableIndex: number,
        $data: cheerio.CheerioAPI,
    ) {
        return $data(ELEMENTS.table)
            .eq(1)
            .find(ELEMENTS.tr)
            .eq(tableIndex)
            .find(ELEMENTS.td)
            .eq(selectIndex)
            .text()
            .trim();
    }

    async pushGeneralSubjects(
        sections: SectionEducationProgram[],
        $data: cheerio.CheerioAPI,
    ) {
        const tableLength = $data(ELEMENTS.table)
            .eq(1)
            .find(ELEMENTS.tr).length;

        for (let tableIndex = 1; tableIndex < tableLength; tableIndex++) {
            let textIndex = await this.getTextIndex(0, tableIndex, $data);
            if (textIndex.match(RegEx.typeRegex)) {
                sections.push({
                    name: textIndex,
                    subjects: [],
                });
            } else {
                textIndex = await this.getTextIndex(1, tableIndex, $data);
                if (textIndex.match(RegEx.subjectRegex)) {
                    sections.at(-1)?.subjects.push({
                        code: textIndex,
                        isRequired: false,
                    });
                }
            }
        }
    }

    async pushSpecialMajor(
        sections: SectionEducationProgram[],
        $data: cheerio.CheerioAPI,
    ) {
        let typeTitles = '';
        let type = '';
        const typeNumbers = $data('*').filter('h3').length;
        let tableElement = null;
        for (let typeIndex = 0; typeIndex < typeNumbers; typeIndex++) {
            tableElement = $data('h3')
                .eq(typeIndex)
                .nextAll(ELEMENTS.table)
                .first();

            const tableElementLength = tableElement.find(ELEMENTS.tr).length;

            const title = $data('h3').eq(typeIndex).text();

            if (title) {
                typeTitles = title
                    .match(RegEx.multitypeRegex)
                    ?.at(2)
                    .split(':')
                    .at(0);
                sections.push({
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
                            .find(ELEMENTS.tr)
                            .eq(tableElementIndex)
                            .find(ELEMENTS.td)
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
                        sections.at(-1).subjects.push({
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
                                return years[i].majors[j].sections[k].subjects[
                                    t
                                ].code?.match(item);
                            }) ||
                            GENERAL.some((item) => {
                                return years[i].majors[j].sections[k].subjects[
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
