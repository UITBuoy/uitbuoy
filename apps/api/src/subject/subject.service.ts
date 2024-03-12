import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectService {
    constructor(@InjectRepository(Subject) private repo: Repository<Subject>) {}

    async create(subject: Subject) {
        return this.repo.save(subject);
    }

    findAll() {
        return `This action returns all Subject`;
    }

    findOne(code: number) {
        return `This action returns a #${code} Subject`;
    }

    update(code: number) {
        return `This action updates a #${code} Subject`;
    }

    remove(code: number) {
        return `This action removes a #${code} Subject`;
    }

    async findByCode(code: string) {
        return this.repo.findOneBy({ code });
    }
}
