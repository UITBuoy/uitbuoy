import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../entities/subject.entity';
import { SubjectService } from '../subject.service';
import {FetchSubjectData} from './fetch-subject-data.cron'
import { FetchSubjectSummaryData } from './fetch-subject-sumary-data.cron';

@Injectable()
export class SubjectConfiguation {
    constructor(
        @InjectRepository(Subject) private repo: Repository<Subject>,
        private readonly subjectService: SubjectService,
    ) {}
}
