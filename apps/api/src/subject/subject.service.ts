import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { EducationProgram } from './entities/educationProgram.entity';

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(Subject) private subjecRepo: Repository<Subject>,
        @InjectRepository(EducationProgram) private educationProgramRepo: Repository<EducationProgram>,
    ) {}

    async findSubjectDataByCode(token: String, code: string) {
        return this.subjecRepo.findOneBy({ code });
    }

    async findSubjectData(token: String, nameEN: string) {
        return this.subjecRepo.findBy({ nameEN });
    }

    async findEducationProgram(token: String, major: string) {
        return this.educationProgramRepo.findBy({ major });
    }
}
