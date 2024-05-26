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
import type { CourseContentEntity } from './course-content.entity';
import type { CourseSectionEntity } from './course-section.entity';

@ObjectType()
@Entity()
export class CourseModuleEntity {
    @Field(() => Int)
    @PrimaryColumn()
    id: number;

    @Field(() => String, { description: 'Name of the module' })
    @Column()
    name: string;

    @Field(() => String, {
        nullable: true,
        description:
            'Summary of the module or the description about a deadline',
    })
    @Column({ nullable: true })
    description: string;

    @Field(() => String, {
        description:
            'Type of the module (i.e. "forum" for notification, "url" for link, "assign" for assignment, "label" for text, "resource" for document)',
    })
    @Column()
    modname: string;

    @Field(() => String, {
        nullable: true,
        description:
            'Type of the module in Vietnamese, used to display in the UI',
    })
    @Column({ nullable: true })
    modplural: string;

    @Field(() => Int, { nullable: true })
    @Column()
    instance: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    contextid: number;

    @Field(() => String, {
        nullable: true,
        description: 'Url to link to the Moodle Web',
    })
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

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    assignOpenedDate: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    assignDueDate: number;

    // @Field(() => String, { nullable: true })
    // @Column({ nullable: true })
    // activitybadge: string;

    // @Field(() => [String], { nullable: true })
    // @Column('simple-array', { nullable: true })
    dates: { timestamp: number }[];

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

    @ManyToOne('CourseSectionEntity', 'modules')
    @JoinColumn({ name: 'section_id' })
    section: Relation<CourseSectionEntity>;

    @OneToMany('CourseContentEntity', 'module', { cascade: true })
    contents: Relation<CourseContentEntity[]>;

    // @Field(() => String, { nullable: true })
    // @Column({ nullable: true })
    // contacts: string;

    // @Field(() => String, { nullable: true })
    // @Column({ nullable: true })
    // filters: string;

    // @Field(() => String, { nullable: true })
    // @Column({ nullable: true })
    // courseformatoptions: string;
}
