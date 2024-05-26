import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Assignment {
    @Field(() => Int, { nullable: true })
    @PrimaryColumn()
    id: number;

    @Field(() => Int, {
        nullable: true,
        description: 'Used this id to find in course/assignment',
    })
    @Column({ nullable: true })
    cmid: number;

    @Field(() => Int, {
        nullable: true,
        description: 'Course detail information',
    })
    @Column({ nullable: true })
    course: number;

    @Field(() => String, {
        nullable: true,
        description: 'Title of the assignment',
    })
    @Column({ nullable: true })
    name: string;

    @Field(() => Float, {
        nullable: true,
        description:
            'Start date of the assignment (Must multiply by 1000 to convert to date)',
    })
    @Column({ nullable: true, type: 'bigint' })
    allowsubmissionsfromdate: number;

    @Field(() => Float, {
        nullable: true,
        description:
            'Deadline of the assignment (Must multiply by 1000 to convert to date)',
    })
    @Column({ nullable: true, type: 'bigint' })
    duedate: number;

    @Field(() => Float, {
        nullable: true,
        description: 'Modified time (Must multiply by 1000 to convert to date)',
    })
    @Column({ nullable: true, type: 'bigint' })
    timemodified: number;

    @Field(() => String, {
        nullable: true,
        description: 'Description about the assignment',
    })
    @Column({ nullable: true })
    intro: string;

    @Field(() => [IntroFile], {
        nullable: true,
        description: 'Files in the description',
    })
    introfiles: IntroFile[];

    @Field(() => [IntroFile], {
        nullable: true,
        description:
            'Attachment files (has the same object structure as introfiles)',
    })
    introattachments: IntroFile[];
}

@ObjectType()
@Entity()
export class IntroFile {
    @Field(() => String, { nullable: true })
    @PrimaryColumn({ generated: true })
    id: string;

    @Field(() => String, { nullable: true, description: 'Name of the file' })
    @Column({ nullable: true })
    filename: string;

    @Field(() => String, {
        nullable: true,
        description:
            'Path of the file, use it to display in a tree folder view',
    })
    @Column({ nullable: true })
    filepath: string;

    @Field(() => Int, {
        nullable: true,
        description: 'Size of the file in byte',
    })
    @Column({ nullable: true })
    filesize: number;

    @Field(() => String, {
        nullable: true,
        description:
            'URL to download the file (Must add "token" in the query params with value of the moodle user\'s token to access the file)',
    })
    @Column({ nullable: true })
    fileurl: string;

    @Field(() => Int, { nullable: true, description: 'Time modified' })
    @Column({ nullable: true })
    timemodified: number;

    @Field(() => String, { nullable: true, description: 'File type' })
    @Column({ nullable: true })
    mimetype: string;
}
