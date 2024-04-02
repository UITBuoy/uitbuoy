import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from '../entities/assignment.entity';

@Injectable()
export class AssignmentService {
    constructor(
        @InjectRepository(Assignment) private repo: Repository<Assignment>,
    ) {}
}
