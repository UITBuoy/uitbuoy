import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Repository } from 'typeorm';
import { MakeUpClass } from '../entities/make-up-class.entity';

@Injectable()
export class MakeUpClassApiService {
    private readonly MAX_PAGE = 50;

    constructor(
        @InjectRepository(MakeUpClass)
        private readonly repo: Repository<MakeUpClass>,
    ) {}

    async fetchMakeupClass(startPage: number = 0, pageNum = this.MAX_PAGE) {
        for (let i = startPage; i < pageNum + startPage; i++) {
            const url = `https://student.uit.edu.vn/thong-bao-nghi-bu?page=${i}`;

            const $data = await getPayload(url);

            const items = $data('article');

            items.each((j, el) => {
                try {
                    const title = $data(el).children('h2').text();
                    const createdDate = extractDateFromCreatedDateString(
                        $data(el).children('.submitted').first().text(),
                    );
                    const classId = extractCourseIdFromString($data(el).text());
                    const courseCode = classId.split('.').slice(0, 2).join('.');
                    const [start, end] = extractStartAndEndLesson(
                        $data(el).children('.content').text(),
                    );
                    const time = extractTime(
                        $data(el).children('.content').text(),
                    );
                    const classroom = extractClassroom(
                        $data(el).children('.content').text(),
                    );

                    this.repo.upsert(
                        {
                            title,
                            createdDate: createdDate.getTime(),
                            classId,
                            courseCode,
                            start,
                            end,
                            time: time.getTime(),
                            classroom,
                        },
                        { conflictPaths: ['title'] },
                    );
                } catch (error) {
                    console.log({ i, j });
                }
            });
        }

        function extractClassroom(str: string): string {
            const classroomRegex = /phòng .*?([ABCDE]\d\.*\d{1,2})/i;
            const classRoom = str.match(classroomRegex)?.[1];
            return classRoom;
        }

        function extractTime(str: string): Date {
            const dateRegex = /(\d{2})\/(\d{2})\/(\d{4})/;
            const [_, day, month, year] = str.match(dateRegex);

            return new Date(
                parseInt(year, 10),
                parseInt(month, 10) - 1,
                parseInt(day, 10),
                12,
                0,
                0,
                0,
            );
        }

        function extractStartAndEndLesson(str: string): number[] {
            const startRegex = /Tiết bắt đầu .*?(\d{1,2})/i;
            const endRegex = /Tiết kết thúc .*?(\d{1,2})/i;
            const start = parseInt(str.match(startRegex)[1], 10);
            const end = parseInt(str.match(endRegex)[1], 10);
            return [start, end];
        }

        function extractCourseIdFromString(str: string): string {
            const courseRegex = /[a-zA-Z]+\d{2,5}\.[a-zA-Z]+\d+(\.\d)*/;
            return str.match(courseRegex)[0];
        }

        function extractDateFromCreatedDateString(dateStr: string): Date {
            const dateRegex = /(\d{2})\/(\d{2})\/(\d{4})/;
            const timeRegex = /(\d{2}):(\d{2})/;

            const [_, day, month, year] = dateStr.match(dateRegex);
            const [__, hour, minute] = dateStr.match(timeRegex);

            return new Date(
                parseInt(year, 10),
                parseInt(month, 10) - 1,
                parseInt(day, 10),
                parseInt(hour, 10),
                parseInt(minute, 10),
            );
        }

        async function getPayload(url: string) {
            return cheerio.load((await axios.get(url)).data);
        }

        // const $summary = await getPayload(API_URL.summarySubjects);
        // const $subject = await getPayload(API_URL.subjects);

        // const subjectsSummary = [];
        // const subjects = [];

        // const tableSummary = $summary('table tr').slice(1);
        // const tableSubject = $subject('table.tablesorter tr').slice(1); // this html has 2 table elements

        // function childrenOptionWithMultiTag(child, colId: number) {
        //     return $summary(child[colId]).children('p').first().text();
        // }

        // function childrenOption(child, colId: number) {
        //     return $subject(child[colId]).text();
        // }

        // function handleMultiChildren(child, index) {
        //     return $subject(child[index])
        //         .contents()
        //         .filter((i, value) => value.type == 'text')
        //         .toArray()
        //         .map((value) => $subject(value).text());
        // }

        // function handleImgChildren(child, index) {
        //     const $child = $subject(child[index]).children('img').first();
        //     if ($child.attr('alt') == 'Hiện không còn mở') return false;
        //     else if ($child.attr('alt') == 'Hiện đang mở') return true;
        //     else return null;
        // }

        // function pushData(
        //     table,
        //     dataList,
        //     property: {
        //         name: string;
        //         colId: number;
        //         function: (child, colId) => any;
        //     }[],
        // ) {
        //     table.each(function (rowId: number, element) {
        //         const children = element.children;

        //         const obj = {};
        //         property.forEach((value) => {
        //             obj[value.name] = value.function(children, value.colId);
        //         });

        //         dataList.push(obj);
        //     });
        // }

        // pushData(tableSummary, subjectsSummary, [
        //     { name: 'code', function: childrenOptionWithMultiTag, colId: 3 },
        //     { name: 'summary', function: childrenOptionWithMultiTag, colId: 7 },
        // ]);

        // pushData(tableSubject, subjects, [
        //     {
        //         name: 'index',
        //         colId: 0,
        //         function: (child, colId) =>
        //             parseInt(childrenOption(child, colId)),
        //     },
        //     { name: 'code', function: childrenOption, colId: 1 },
        //     { name: 'nameVN', function: childrenOption, colId: 2 },
        //     { name: 'nameEN', function: childrenOption, colId: 3 },
        //     { name: 'isActive', function: handleImgChildren, colId: 4 },
        //     { name: 'department', function: childrenOption, colId: 5 },
        //     { name: 'type', function: childrenOption, colId: 6 },
        //     { name: 'oldCode', function: childrenOption, colId: 7 },
        //     { name: 'equivalentCode', function: handleMultiChildren, colId: 8 },
        //     { name: 'requiredCode', function: handleMultiChildren, colId: 9 },
        //     { name: 'previousCode', function: handleMultiChildren, colId: 10 },
        //     {
        //         name: 'theoreticalCredit',
        //         colId: 11,
        //         function: (child, index) =>
        //             parseInt(childrenOption(child, index)),
        //     },
        //     {
        //         name: 'practicalCredit',
        //         colId: 12,
        //         function: (child, index) =>
        //             parseInt(childrenOption(child, index)),
        //     },
        // ]);

        // this.repo.save(subjects);
        // this.repo.save(subjectsSummary);

        console.log('done');
    }
}
