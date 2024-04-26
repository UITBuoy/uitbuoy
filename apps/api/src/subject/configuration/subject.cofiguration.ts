import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as cheerio from 'cheerio';
import API_URL from 'src/common/constants/url';
import { Repository } from 'typeorm';
import { Subject } from '../entities/subject.entity';
import { SubjectService } from '../services/subject.service';

@Injectable()
export class SubjectConfiguration {
    constructor(
        @InjectRepository(Subject) private repo: Repository<Subject>,
        private readonly subjectService: SubjectService,
    ) {}

    async saveSubject() {
        const subjects = await this.crawlSubject();
        const subjectsSummary = await this.crawlSummarySubject();

        console.log({ subjects });
        console.log({ subjectsSummary });

        this.repo.save(subjects);
        this.repo.save(subjectsSummary);
        return await this.subjectService.findAllSubject();
    }
    async crawlSubject() {
        const $subject = await this.getPayload(API_URL.subjects);
        const tableSubject = $subject('table.tablesorter tr').slice(1); // this html has 2 table elements
        return await this.pushData(tableSubject, [
            {
                name: 'index',
                colId: 0,
                function: (child, colId: number) =>
                    parseInt(this.childrenOption(child, colId, $subject)),
            },
            {
                name: 'code',
                function: (child, colId: number) =>
                    this.childrenOption(child, colId, $subject),
                colId: 1,
            },
            {
                name: 'nameVN',
                function: (child, colId: number) =>
                    this.childrenOption(child, colId, $subject),
                colId: 2,
            },
            {
                name: 'nameEN',
                function: (child, colId: number) =>
                    this.childrenOption(child, colId, $subject),
                colId: 3,
            },
            {
                name: 'isActive',
                function: (child, colId: number) =>
                    this.handleImgChildren(child, colId, $subject),
                colId: 4,
            },
            {
                name: 'department',
                function: (child, colId: number) =>
                    this.childrenOption(child, colId, $subject),
                colId: 5,
            },
            {
                name: 'type',
                function: (child, colId: number) =>
                    this.childrenOption(child, colId, $subject),
                colId: 6,
            },
            {
                name: 'oldCode',
                function: (child, colId: number) =>
                    this.childrenOption(child, colId, $subject),
                colId: 7,
            },
            {
                name: 'equivalentCode',
                function: (child, colId: number) =>
                    this.handleMultiChildren(child, colId, $subject),
                colId: 8,
            },
            {
                name: 'requiredCode',
                function: (child, colId: number) =>
                    this.handleMultiChildren(child, colId, $subject),
                colId: 9,
            },
            {
                name: 'previousCode',
                function: (child, colId: number) =>
                    this.handleMultiChildren(child, colId, $subject),
                colId: 10,
            },
            {
                name: 'theoreticalCredit',
                colId: 11,
                function: (child, index) =>
                    parseInt(this.childrenOption(child, index, $subject)),
            },
            {
                name: 'practicalCredit',
                colId: 12,
                function: (child, index) =>
                    parseInt(this.childrenOption(child, index, $subject)),
            },
        ]);
    }
    async crawlSummarySubject() {
        const $summary = await this.getPayload(API_URL.summarySubjects);
        const tableSummary = $summary('table tr').slice(1);
        return await this.pushData(tableSummary, [
            {
                name: 'code',
                function: (child, colId: number) =>
                    this.childrenOptionWithMultiTag(child, colId, $summary),
                colId: 3,
            },
            {
                name: 'summary',
                function: (child, colId: number) =>
                    this.childrenOptionWithMultiTag(child, colId, $summary),
                colId: 7,
            },
        ]);
    }

    async getPayload(url: string) {
        return cheerio.load((await axios.get(url)).data);
    }

    childrenOptionWithMultiTag(
        child,
        colId: number,
        $summary: cheerio.CheerioAPI,
    ) {
        return $summary(child[colId]).children('p').first().text();
    }

    childrenOption(child, colId: number, $subject: cheerio.CheerioAPI) {
        return $subject(child[colId]).text();
    }

    handleMultiChildren(child, index, $subject: cheerio.CheerioAPI) {
        return $subject(child[index])
            .contents()
            .filter((i, value) => value.type == 'text')
            .toArray()
            .map((value) => $subject(value).text());
    }

    handleImgChildren(child, index, $subject: cheerio.CheerioAPI) {
        const $child = $subject(child[index]).children('img').first();
        if ($child.attr('alt') == 'Hiện không còn mở') return false;
        else if ($child.attr('alt') == 'Hiện đang mở') return true;
        else return null;
    }

    async pushData(
        table: cheerio.Cheerio<cheerio.Element>,
        property: {
            name: string;
            colId: number;
            function: (child, colId) => any;
        }[],
    ) {
        const dataList = [];
        table.each(function (rowId: number, element) {
            const children = element.children;

            const obj = {};
            property.forEach((value) => {
                obj[value.name] = value.function(children, value.colId);
            });

            dataList.push(obj);
        });
        return dataList;
    }
}
