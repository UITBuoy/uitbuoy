import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as cheerio from 'cheerio';
import API_URL from 'src/common/constants/url';
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
        const majors = [];

        const courseLength: number = $educationProgram('div.acc-item').length;

        for (let i = 0; i < courseLength; i++) {
            const courseName = $educationProgram('div.accordion').eq(i).text();
            courses.push({ course: courseName, majors: [] });

            const key = `${courseName}`;

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
                const link = $educationProgram('div.panel')
                    .eq(i)
                    .children('div')
                    .eq(j)
                    .children('a')
                    .attr('href');
                courses[i].majors.push({ majorName, link });
            }
        }
        // for (let i = 0; i < courses.length; i++) {
        //     for (let j = 0; j < courses[i].majors.length; j++) {
        let link = `https://daa.uit.edu.vn/${courses[2].majors[5].link}`;
        const $data = await getPayload(link);
        for (let k = 0; k < 4; k++)
            for (
                let i = 0;
                i <
                $data('fieldset')
                    .eq(1)
                    .children('div.fieldset-wrapper')
                    .children('table')
                    .eq(k)
                    .children('tbody')
                    .children('tr').length;
                i++
            ) {
                const trainingSystem = $data('fieldset')
                    .eq(1)
                    .children('div.fieldset-wrapper')
                    .children('table')
                    .eq(k)
                    .children('tbody')
                    .children('tr')
                    .eq(i)
                    .children('td')
                    .eq(1)
                    .not('p.&nbsp')
                    .children('p')
                    .text();

                if (
                    trainingSystem.match(/^[A-Za-z]+\d+$/)
                )
                    console.log(trainingSystem);
            }
    }
    //     }
    // }

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
