import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class CourseModule {
    @Field(() => Int)
    @PrimaryColumn()
    id: number;

    @Field(() => String)
    @Column()
    name: string; //name of course of module

    @Field(() => String)
    @Column()
    modname: string; //name module in english

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    modplural: string; //name module in VN

    @Field(() => Int, { nullable: true })
    @Column()
    instance: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    contextid: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    url: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    visible: number;

    @Field(() => Boolean, { nullable: true })
    @Column({ nullable: true })
    uservisible: boolean;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    visibleoncoursepage: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    modicon: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    indent: number;

    @Field(() => Boolean, { nullable: true })
    @Column({ nullable: true })
    noviewlink: boolean;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    completion: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    downloadcontent: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    groupmode: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    module: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    course: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    section: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    sectionnum: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    groupingid: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    showgrades: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    newsitems: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    maxbytes: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    showreports: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    groupmodeforce: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    defaultgroupingid: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    enablecompletion: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    completionnotify: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    onclick: string;

    @Field(() => [String], { nullable: true })
    @Column({ nullable: true })
    activitybadge: string[];

    @Field(() => [String], { nullable: true })
    @Column({ nullable: true })
    dates: string[];

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    customdata: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    afterlink: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    lang: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    theme: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    format: string;

    @Field(() => [String], { nullable: true })
    @Column({ nullable: true })
    contacts: string[];

    @Field(() => [String], { nullable: true })
    @Column({ nullable: true })
    filters: string[];

    @Field(() => [String], { nullable: true })
    @Column({ nullable: true })
    courseformatoptions: string[];

    @Field(() => [String], { nullable: true })
    @Column({ nullable: true })
    enrollmentmethods: string[];
}
