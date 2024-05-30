import { Subject } from '@/subject/entities/subject.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SemesterProgram {
    @Field(() => Int)
    index: number;

    @Field(() => [Subject])
    subjects: Subject[];
}
