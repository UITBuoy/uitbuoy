import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as cheerio from 'cheerio';
import API_URL from 'src/common/constants/url';
import { Repository } from 'typeorm';
import { Subject } from '../entities/subject.entity';

@Injectable()
// export class SubjectConfiguration implements OnApplicationBootstrap {
export class SubjectConfiguration {
    constructor(@InjectRepository(Subject) private repo: Repository<Subject>) {}

    //once per 6 months
    @Cron('0 0 0 1 6 *') // Remember to test later (13/3/24)
    async cron() {
        async function getPayload(url: string) {
            return cheerio.load((await axios.get(url)).data);
        }
        const $summary = await getPayload(API_URL.summarySubjects);
        const $subject = await getPayload(API_URL.subjects);

        const subjectsSummary = [];
        const subjects = [];

        const tableSummary = $summary('table tr').slice(1);
        const tableSubject = $subject('table.tablesorter tr').slice(1); // this html has 2 table elements

        function childrenOptionWithMultiTag(child, colId: number) {
            return $summary(child[colId]).children('p').first().text();
        }

        function childrenOption(child, colId: number) {
            return $subject(child[colId]).text();
        }

        function handleMultiChildren(child, index) {
            return $subject(child[index])
                .contents()
                .filter((i, value) => value.type == 'text')
                .toArray()
                .map((value) => $subject(value).text());
        }

        function handleImgChildren(child, index) {
            const $child = $subject(child[index]).children('img').first();
            if ($child.attr('alt') == 'Hiện không còn mở') return false;
            else if ($child.attr('alt') == 'Hiện đang mở') return true;
            else return null;
        }

        function pushData(
            table,
            dataList,
            property: {
                name: string;
                colId: number;
                function: (child, colId) => any;
            }[],
        ) {
            table.each(function (rowId: number, element) {
                const children = element.children;

                const obj = {};
                property.forEach((value) => {
                    obj[value.name] = value.function(children, value.colId);
                });

                dataList.push(obj);
            });
        }

        pushData(tableSummary, subjectsSummary, [
            { name: 'code', function: childrenOptionWithMultiTag, colId: 3 },
            { name: 'summary', function: childrenOptionWithMultiTag, colId: 7 },
        ]);

        pushData(tableSubject, subjects, [
            {
                name: 'index',
                colId: 0,
                function: (child, colId) =>
                    parseInt(childrenOption(child, colId)),
            },
            { name: 'code', function: childrenOption, colId: 1 },
            { name: 'nameVN', function: childrenOption, colId: 2 },
            { name: 'nameEN', function: childrenOption, colId: 3 },
            { name: 'isActive', function: handleImgChildren, colId: 4 },
            { name: 'department', function: childrenOption, colId: 5 },
            { name: 'type', function: childrenOption, colId: 6 },
            { name: 'oldCode', function: childrenOption, colId: 7 },
            { name: 'equivalentCode', function: handleMultiChildren, colId: 8 },
            { name: 'requiredCode', function: handleMultiChildren, colId: 9 },
            { name: 'previousCode', function: handleMultiChildren, colId: 10 },
            {
                name: 'theoreticalCredit',
                colId: 11,
                function: (child, index) =>
                    parseInt(childrenOption(child, index)),
            },
            {
                name: 'practicalCredit',
                colId: 12,
                function: (child, index) =>
                    parseInt(childrenOption(child, index)),
            },
        ]);

        this.repo.save(subjects);
        this.repo.save(subjectsSummary);

        console.log('done');
    }
}
