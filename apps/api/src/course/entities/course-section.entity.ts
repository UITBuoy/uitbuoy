import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    Relation,
} from 'typeorm';
import type { CourseModuleEntity } from './course-module.entity';
import type { Course } from './course.entity';

@ObjectType()
@Entity()
export class CourseSectionEntity {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    @Column()
    name: string; //name of course of content

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    summary: string;

    @Field(() => Int, { nullable: true })
    @Column()
    visible: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    summaryformat: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    section: number;

    @Field(() => Boolean, { nullable: true })
    @Column({ nullable: true })
    uservisible: boolean;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    hiddenbynumsections: number;

    @ManyToOne('Course', 'sections')
    @JoinColumn({ name: 'cousre_id' })
    course: Relation<Course>;

    @OneToMany('CourseModuleEntity', 'section', { cascade: true })
    modules: Relation<CourseModuleEntity[]>;
}
