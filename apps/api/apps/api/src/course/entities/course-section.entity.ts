import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    Relation,
} from 'typeorm';
import type { CourseModuleEntity } from './course-module.entity';
import type { Course } from './course.entity';

@ObjectType()
@Entity()
export class CourseSectionEntity {
    @Field(() => Int)
    @PrimaryColumn()
    id: number;

    @Field(() => String, {
        description: 'Name of the section (i.e. "General", "Chương 1")',
    })
    @Column()
    name: string;

    @Field(() => String, {
        nullable: true,
        description: 'Basic summary about the section',
    })
    @Column({ nullable: true })
    summary: string;

    @Field(() => Int, { nullable: true })
    @Column()
    visible: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    summaryformat: number;

    @Field(() => Int, { nullable: true, description: 'Section order' })
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
