import { User } from '@/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        userId,
        inComing,
    }: {
        year?: number;
        month?: number;
        day?: number;
        userId: number;
        inComing: boolean;
    }) {
        if (year && month && day) {
            const time = new Date(year, month - 1, day, 12, 0, 0, 0);
            return this.repo
                .createQueryBuilder()
                .where('time = :time', { time })
                .andWhere((qb) => {
                    const subQuery = qb
                        .subQuery()
                        .select('course.shortname')
                        .from(User, 'User')
                        .leftJoinAndSelect('User.courses', 'course')
                        .where('User.id = :userId', { userId })
                        .getQuery();
                    return '"courseCode" IN ' + subQuery;
                })
                .orderBy('time', 'ASC')
                .getMany();
        }

        return this.repo
            .createQueryBuilder()
            .where(inComing ? 'MakeUpClass.time > :time' : 'true', {
                time: new Date().getTime(),
            })
            .andWhere((qb) => {
                const subQuery = qb
                    .subQuery()
                    .select('course.shortname')
                    .from(User, 'User')
                    .leftJoin('User.courses', 'course')
                    .where('User.id = :userId', { userId })
                    .getQuery();
                return '"courseCode" IN ' + subQuery;
            })
            .orderBy('time', 'ASC')
            .getMany();
    }
}
