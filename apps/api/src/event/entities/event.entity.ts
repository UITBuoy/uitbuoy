import { Calendar } from '@/calendar/entities/calendar.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Int32, OneToMany, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class EventEntity {
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

    @Field(() => Int, { nullable: true })
    @Column(() => Int32)
    timestart: number;

    @Field(() => Int, { nullable: true })
    @Column(() => Int32)
    timeduration: number;

    @Field(() => Int, { nullable: true })
    @Column(() => Int32)
    timesort: number;

    @Field(() => Int, { nullable: true })
    @Column(() => Int32)
    timeusermidnight: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    visible: number;

    @Field(() => Int, { nullable: true })
    @Column(() => Int32)
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

    // @Field(() => [Calendar], { nullable: true })
    // @OneToMany(() => Calendar, (calendar) => calendar.event)
    // calendars: Calendar[];
}
