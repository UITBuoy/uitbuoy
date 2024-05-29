import { MajorSubject } from '@/subject/entities/majorSubject.entity';
import { Subject } from '@/subject/entities/subject.entity';
import { IntersectionType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SectionSubject extends IntersectionType(MajorSubject, Subject) {}
