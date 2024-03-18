import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { CourseModuleEntity } from './course-module.entity';

@ObjectType()
@Entity()
export class CourseContentEntity {
    @Field(() => Int)
    @PrimaryColumn()
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

    @Field(() => Course, { nullable: true })
    @ManyToOne(() => Course)
    @JoinColumn({ name: 'cousreid' })
    courseid: Course;

    @Field(() => Boolean, { nullable: true })
    @Column({ nullable: true })
    uservisible: boolean;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    hiddenbynumsections: number;

    @Field(() => [CourseModuleEntity], { nullable: true })
    @OneToMany(
        () => CourseModuleEntity,
        (courseModule) => courseModule.sectionEntity,
    )
    modules: CourseModuleEntity[];
}
