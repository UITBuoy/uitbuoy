import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    Long,
    PrimaryColumn
} from 'typeorm';

@ObjectType()
@Entity()
export class Event {
    @Field(() => Int)
    @PrimaryColumn()
    id: number;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    description: string;

    @Field(() => String, { nullable: true })
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

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    modulename: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    activityname: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    activitystr: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    instance: number;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    eventtype: string;

    @Field(() => Long, { nullable: true })
    @Column({ nullable: true })
    timestart: number;

    @Field(() => Long, { nullable: true })
    @Column({ nullable: true })
    timeduration: number;

    @Field(() => Long, { nullable: true })
    @Column({ nullable: true })
    timesort: number;

    @Field(() => Long, { nullable: true })
    @Column({ nullable: true })
    timeusermidnight: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    visible: number;

    @Field(() => Long, { nullable: true })
    @Column({ nullable: true })
    timemodified: number;

    @Field(() => Boolean, { nullable: true })
    @Column({ nullable: true })
    overdue: boolean;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    icon: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    normalisedeventtype: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    normalisedeventtypetext: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    purpose: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    action: string; //class action

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    url: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    subscription: string;

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
}
