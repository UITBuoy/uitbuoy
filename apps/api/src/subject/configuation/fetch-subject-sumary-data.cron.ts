import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../entities/subject.entity';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync } from 'node:fs';

@Injectable()
export class FetchSubjectSummaryData {
    constructor(@InjectRepository(Subject) private repo: Repository<Subject>) {}

    async fetch() {
        const response = await axios.get(
            'https://student.uit.edu.vn/content/bang-tom-tat-mon-hoc',
        );

        const html = response.data;

        const $ = cheerio.load(html);

        const subjectsSummary = [];

        const table = $('table tr').slice(1);

        function childrenOption(child, index) {
            return $(child[index]).children('p').first().text();
        }
        table.each(function (index, element) {
            const children = element.children;

            subjectsSummary.push({
                index: childrenOption(children, 1),
                code: childrenOption(children, 3),
                name: childrenOption(children, 5),
                summary: childrenOption(children, 7),
            });
        });

        // writeFileSync('./_data.json', JSON.stringify(subjectsSummary), {
        //     flag: 'w',
        // });
        this.repo.save(subjectsSummary[3]);
        console.log('summary done');
    }
}
