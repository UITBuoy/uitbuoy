import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    Relation,
} from 'typeorm';
import type { CourseModuleEntity } from './course-module.entity';

@ObjectType()
@Entity()
export class CourseContentEntity {
    @Field(() => Int)
    @PrimaryColumn({ generated: true })
    id: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    type: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    filename: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    filepath: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    filesize: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    fileurl: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    timecreated: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    timemodified: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    sortorder: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    userid: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    author: string;

    @ManyToOne('CourseModuleEntity', 'contents')
    @JoinColumn({ name: 'module_id' })
    module: Relation<CourseModuleEntity>;
}
