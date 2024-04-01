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
import type { CourseContentEntity } from './course-content.entity';
import type { User } from '@/user/entities/user.entity';
import type { Lecturer } from '@/lecturer/lecturer.entity';

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
    display_name: string;

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

    @Field({ nullable: true })
    @Column({ nullable: true })
    coursecategory: string;

    @ManyToMany('Lecturer', 'courses')
    contacts: Relation<Lecturer[]>;

    @OneToMany('CourseContentEntity', 'courseid')
    contents: Relation<CourseContentEntity>[];

    @ManyToMany('User', 'courses')
    users: Relation<User[]>;

    @AfterLoad()
    loadFullName?() {
        this.display_name = this.fullname.split(' - ').at(0);
    }
}
