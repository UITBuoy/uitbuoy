import type { Lecturer } from '@/lecturer/lecturer.entity';
import type { MakeUpClass } from '@/make-up-class/entities/make-up-class.entity';
import type { User } from '@/user/entities/user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    AfterLoad,
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryColumn,
    Relation,
} from 'typeorm';
import type { CourseSectionEntity } from './course-section.entity';

@ObjectType()
@Entity()
export class Course {
    @Field(() => Int, { nullable: true })
    @PrimaryColumn()
    id: number;

    @Field(() => String, {
        nullable: true,
        description:
            'Include course name and course id (i.e. Kiến trúc phần mềm - SE346.PMCL)',
    })
    @Column({ nullable: true })
    fullname: string;

    @Field(() => String, {
        nullable: true,
        description: 'Only return the course name (i.e. "Kiến trúc phần mềm")',
    })
    display_name: string;

    @Field(() => String, {
        nullable: true,
        description: 'Course id (i.e. SE346.PMCL)',
    })
    @Column({ nullable: true })
    shortname: string;

    @Field(() => String, {
        nullable: true,
        description: 'Course id (i.e. SE346.PMCL)',
    })
    @Column({ nullable: true })
    idnumber: string;

    @Field(() => Int, {
        nullable: true,
        description:
            'Start date of the course (Must multiply by 1000 to convert to date)',
    })
    @Column({ nullable: true })
    startdate: number;

    @Field(() => Int, {
        nullable: true,
        description:
            'Start date of the course (Must multiply by 1000 to convert to date)',
    })
    @Column({ nullable: true })
    enddate: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    summaryformat: number;

    // @Field(() => String, { nullable: true })
    // @Column({ nullable: true })
    // summaryfiles: string;

    // @Field(() => String, { nullable: true })
    // @Column({ nullable: true })
    // overviewfiles: string;

    // @Field(() => String, { nullable: true })
    // @Column({ nullable: true })
    // enrollmentmethods: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    sortorder: number;

    @Field(() => String, {
        nullable: true,
        description: 'Description of the course',
    })
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

    @Field(() => String, {
        nullable: true,
        description: 'Image of the course (base64 string)',
    })
    @Column({ nullable: true })
    courseimage: string;

    @Field(() => String, {
        nullable: true,
        description: 'Url to the link of the course in Moodle web',
    })
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

    @Field({
        nullable: true,
        description:
            'Category of the current course (i.e. "Khoa Công Nghệ Phần Mềm", "Môn chung", "2023 - 2024 - 2nd Term")',
    })
    @Column({ nullable: true })
    coursecategory: string;

    @ManyToMany('Lecturer', 'courses')
    contacts: Relation<Lecturer[]>;

    @OneToMany('CourseSectionEntity', 'course')
    sections: Relation<CourseSectionEntity>[];

    @ManyToMany('User', 'courses')
    users: Relation<User[]>;

    @OneToMany('MakeUpClass', 'course')
    makeUpClasses: Relation<MakeUpClass>[];

    @AfterLoad()
    loadFullName?() {
        this.display_name = this.fullname.split(' - ').at(0);
    }
}
