import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectService {
    constructor(@InjectRepository(Subject) private repo: Repository<Subject>) {}

    async findSubjectDataByCode(token: String, code: string) {
        return this.repo.findOneBy({ code });
    }

    async findSubjectData(token: String, nameEN: string) {
        return this.repo.findBy({ nameEN });
    }
}
