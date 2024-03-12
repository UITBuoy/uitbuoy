import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubjectService } from './subject.service';
import { Subject } from './entities/subject.entity';

@Resolver(()=> Subject)
export class SubjectResolver{
    constructor(private readonly subjecService: SubjectService) {};
}