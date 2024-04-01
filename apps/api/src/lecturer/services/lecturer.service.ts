import { Injectable } from '@nestjs/common';
import { LecturerApiService } from './lecturer-api.service';
import { In, Repository } from 'typeorm';
import { Lecturer } from '../lecturer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenService } from '@/common/services/token.service';

@Injectable()
export class LecturerService {
    constructor(
        private readonly lecturerApiService: LecturerApiService,
        @InjectRepository(Lecturer)
        private readonly repo: Repository<Lecturer>,
    ) {}

    async save(token: string, ids: number[]) {
        await Promise.all(
            ids.map(async (id) => {
                const lecturer =
                    await this.lecturerApiService.getLecturerProfile({
                        token,
                        id,
                    });
                await this.repo.save(lecturer);
                return lecturer;
            }),
        );
    }

    async findLecturerByIds(token: string, ids: number[]) {
        const results = await this.repo.findBy({ id: In(ids) });
        if (!results.every((v) => !!v)) {
            const lecturers = await Promise.all(
                ids.map(async (id) => {
                    const lecturer =
                        await this.lecturerApiService.getLecturerProfile({
                            token,
                            id,
                        });
                    await this.repo.save(lecturer);
                    return lecturer;
                }),
            );
            return lecturers;
        }
        return results;
    }
}
