import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CourseModuleEntity } from './course-module.entity';

@ObjectType()
@Entity()
export class Course {
    @Field(() => Int, { nullable: true })
    @PrimaryColumn()
    id: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    fullname: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    shortname: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    idnumber: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    startdate: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    enddate: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    summaryformat: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    summaryfiles: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    overviewfiles: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    enrollmentmethods: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    sortorder: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    summary: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    categoryname: string;

    @Field(() => Boolean, { nullable: true })
    @Column({ nullable: true })
    visible: boolean;

    @Field(() => Boolean, { nullable: true })
    @Column({ nullable: true })
    showactivitydates: boolean;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    name: string; //name of content of course

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    section: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    hiddenbynumsections: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    categoryid: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    courseimage: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    viewurl: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    showcompletionconditions: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    pdfexportfont: string;

    @Field(() => Boolean, { nullable: true })
    @Column({ nullable: true })
    uservisible: boolean;

    @Field(() => [CourseModuleEntity], { nullable: true })
    @OneToMany(() => CourseModuleEntity, (courseModule) => courseModule.course)
    modules: CourseModuleEntity[];

}
