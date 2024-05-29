import { MajorSubject } from '@/subject/entities/majorSubject.entity';
import { Subject } from '@/subject/entities/subject.entity';
import { Field, IntersectionType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SectionSubject extends IntersectionType(MajorSubject, Subject) {
    @Field(() => Boolean)
    isLearned: boolean;
}
