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

    @Field({
        nullable: true,
        description: 'Type of the file ("file" or "url")',
    })
    @Column({ nullable: true })
    type: string;

    @Field({ nullable: true, description: 'Name of the file' })
    @Column({ nullable: true })
    filename: string;

    @Field({
        nullable: true,
        description:
            'Path of the file, use it to display in a tree folder view',
    })
    @Column({ nullable: true })
    filepath: string;

    @Field({ nullable: true, description: 'File size in byte' })
    @Column({ nullable: true })
    filesize: string;

    @Field({
        nullable: true,
        description:
            'URL to download the file (Must add "token" in the query params with value of the moodle user\'s token to access the file)',
    })
    @Column({ nullable: true })
    fileurl: string;

    @Field({
        nullable: true,
        description: 'Created time (Must multiply by 1000 to convert to date)',
    })
    @Column({ nullable: true })
    timecreated: string;

    @Field({
        nullable: true,
        description: 'Modified time (Must multiply by 1000 to convert to date)',
    })
    @Column({ nullable: true })
    timemodified: string;

    @Field({ nullable: true, description: 'Order to sort' })
    @Column({ nullable: true })
    sortorder: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    userid: string;

    @Field({ nullable: true, description: 'Name of the author' })
    @Column({ nullable: true })
    author: string;

    @ManyToOne('CourseModuleEntity', 'contents')
    @JoinColumn({ name: 'module_id' })
    module: Relation<CourseModuleEntity>;
}
