import type { Course } from '@/course/entities/course.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    Int32,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    Relation,
} from 'typeorm';
import type { EventReminder } from './event-reminder.entity';

@ObjectType()
@Entity()
export class EventEntity {
    @Field(() => Int)
    @PrimaryColumn()
    id: number;

    @Field(() => String, {
        description: 'Title of the event (Displayed in the calendar)',
    })
    @Column()
    name: string;

    @Field(() => String, {
        nullable: true,
        description: 'Description of the event (Often in HTML format)',
    })
    @Column({ nullable: true })
    description: string;

    @Field(() => String, {
        nullable: true,
        description: 'Location of the event',
    })
    @Column({ nullable: true })
    location: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    categoryid: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    groupid: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    userid: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    repeatid: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    eventcount: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    component: string;

    @Field(() => String, {
        nullable: true,
        description: 'Type of the event (i.e. "assign" for a assignment)',
    })
    @Column({ nullable: true })
    modulename: string;

    @Field(() => String, {
        nullable: true,
        description: 'Title of the event (the main title)',
    })
    @Column({ nullable: true })
    activityname: string;

    @Field(() => String, {
        nullable: true,
        description: 'Short summary about the title (i.e. "Bài tập tới hạn")',
    })
    @Column({ nullable: true })
    activitystr: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    instance: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    eventtype: string;

    @Field(() => Int, {
        nullable: true,
        description:
            'Exact deadline time date (Must multiply by 1000 to convert to date)',
    })
    @Column()
    timestart: number;

    @Field(() => Int, { nullable: true })
    @Column()
    timeduration: number;

    @Field(() => Int, {
        nullable: true,
        description:
            'Exact deadline time date (Must multiply by 1000 to convert to date)',
    })
    @Column()
    timesort: number;

    @Field(() => Int, {
        nullable: true,
        description:
            'Deadline time date (Midnight value, not the exact time) (Must multiply by 1000 to convert to date)',
    })
    @Column()
    timeusermidnight: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    visible: number;

    @Field(() => Int, { nullable: true })
    @Column(() => Int32)
    timemodified: number;

    @Field(() => Boolean, { nullable: true, description: 'Is pass the due' })
    @Column({ nullable: true })
    overdue: boolean;

    @Field(() => String, { nullable: true, description: 'i.e. "course"' })
    @Column({ nullable: true })
    normalisedeventtype: string;

    @Field(() => String, {
        nullable: true,
        description: 'i.e. "Sự kiện khoá học"',
    })
    @Column({ nullable: true })
    normalisedeventtypetext: string;

    @Field(() => String, { nullable: true, description: 'i.e. "assessment"' })
    @Column({ nullable: true })
    purpose: string;

    // @Field(() => String, { nullable: true })
    // @Column({ nullable: true })
    // action: string; //class action

    @Field(() => String, {
        nullable: true,
        description: 'Link to the Moodle web',
    })
    @Column({ nullable: true })
    url: string;

    @Field(() => Boolean, { nullable: true })
    @Column({ nullable: true })
    canedit: Boolean;

    @Field(() => Boolean, { nullable: true })
    @Column({ nullable: true })
    candelete: Boolean;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    deleteurl: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    editurl: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    viewurl: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    formattedtime: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    formattedlocation: string;

    @Field(() => Boolean, { nullable: true })
    @Column({ nullable: true })
    isactionevent: Boolean;

    @Field(() => Boolean, { nullable: true })
    @Column({ nullable: true })
    iscourseevent: Boolean;

    @Field(() => Boolean, { nullable: true })
    @Column({ nullable: true })
    iscategoryevent: Boolean;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    groupname: string;

    @ManyToOne('Course', { cascade: false })
    @JoinColumn({ name: 'course_id' })
    course: Relation<Course>;

    @OneToMany('EventReminder', 'event')
    reminders: Relation<EventReminder[]>;
}
