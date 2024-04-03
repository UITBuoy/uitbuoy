import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Assignment {
    @Field(() => Int, { nullable: true })
    @PrimaryColumn()
    id: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    cmid: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    course: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    name: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    allowsubmissionsfromdate: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    duedate: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    timemodified: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    intro: string;

    @Field(() => [IntroFile], { nullable: true })
    introfiles: IntroFile[];

    @Field(() => [IntroFile], { nullable: true })
    introattachments: IntroFile[];
}

@ObjectType()
@Entity()
export class IntroFile {
    @Field(() => String, { nullable: true })
    @PrimaryColumn({ generated: true })
    id: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    filename: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    filepath: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    filesize: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    fileurl: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    timemodified: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    mimetype: string;
}
