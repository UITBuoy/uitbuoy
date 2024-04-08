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

        const courses = {};

        const courseIndex: number = $educationProgram('div.acc-item').length;

        for (let i = 0; i < courseIndex; i++) {
            const course = $educationProgram('div.accordion').eq(i).text();

            const key = `${course}`;
            courses[key] = { majors: [], links: [] };
            const majorIndex: number = $educationProgram('div.acc-item')
                .eq(i)
                .children('div.panel')
                .children('div.views-row').length;

            for (let j = 0; j < majorIndex; j++) {
                courses[key].majors.push(
                    $educationProgram('div.panel')
                        .eq(i)
                        .children('div')
                        .eq(j)
                        .children('a')
                        .text(),
                );
                courses[key].links.push(
                    $educationProgram('div.panel')
                        .eq(i)
                        .children('div')
                        .eq(j)
                        .children('a')
                        .attr('href'),
                );
            }
        }
        console.log(courses);
        console.log((Object.values(courses) as any)[0].majors[0]);
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
