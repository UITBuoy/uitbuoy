import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThan, Repository } from 'typeorm';
import { MakeUpClass } from '../entities/make-up-class.entity';

@Injectable()
export class MakeUpClassService {
    constructor(
        @InjectRepository(MakeUpClass)
        private readonly repo: Repository<MakeUpClass>,
    ) {}

    findAll({
        year,
        month,
        day,
        courseCodes,
        inComing,
    }: {
        year?: number;
        month?: number;
        day?: number;
        courseCodes: string[];
        inComing: boolean;
    }) {
        if (year && month && day) {
            const time = new Date(year, month - 1, day, 12, 0, 0, 0);
            return this.repo.find({
                where: {
                    courseCode: In(courseCodes),
                    time: time.getTime(),
                },
                order: { time: 'ASC' },
            });
        }
        return this.repo.find({
            where: {
                courseCode: In(courseCodes),
                ...(inComing
                    ? {
                          time: MoreThan(new Date().getTime()),
                      }
                    : {}),
            },
            order: { time: 'ASC' },
        });
    }
}
