import { Calendar } from '@/calendar/entities/calendar.entity';
import type { Course } from '@/course/entities/course.entity';
import type { EventReminder } from '@/event/entities/event-reminder.entity';
import type { NotificationDevice } from '@/notification/entities/notification-device.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryColumn,
    Relation,
} from 'typeorm';
import type { GoogleUser } from './google-user.entity';

@ObjectType()
@Entity()
export class User {
    @Field(() => Int, { nullable: true })
    @PrimaryColumn()
    id: number;

    @Field(() => String)
    @Column()
    username: string;

    @Field(() => String)
    @Column()
    fullname: string;

    @Field(() => String)
    @Column()
    email: string;

    @Field(() => String, { nullable: true })
    @Column()
    department: string;

    @Field(() => Int, { nullable: true })
    @Column()
    firstaccess: number;

    @Field(() => Int, { nullable: true })
    @Column()
    lastaccess: number;

    @Field(() => String, { nullable: true })
    @Column()
    auth: string;

    @Field(() => String, { nullable: true })
    @Column()
    suspended: string;

    @Field(() => String, { nullable: true })
    @Column()
    confirmed: string;

    @Field(() => String, { nullable: true })
    @Column()
    lang: string;

    @Field(() => String, { nullable: true })
    @Column()
    theme: string;

    @Field(() => String, { nullable: true })
    @Column()
    timezone: string;

    @Field(() => String, { nullable: true })
    @Column()
    mailformat: number;

    @Field(() => String, { nullable: true })
    @Column()
    city: string;

    @Field(() => String, { nullable: true })
    @Column()
    country: string;

    @Field(() => String, { nullable: true })
    @Column()
    profileimageurlsmall: string;

    @Field(() => String, { nullable: true })
    @Column()
    profileimageurl: string;

    @Field(() => [UserPreference])
    preferences: UserPreference[];

    @Field(() => String)
    @Column()
    token: string;

    @OneToMany('Calendar', 'user')
    calendars: Relation<Calendar>[];

    @OneToMany('GoogleUser', 'user')
    googleUsers: Relation<GoogleUser>[];

    @ManyToMany('Course', 'users')
    @JoinTable()
    courses: Relation<Course[]>;

    @OneToMany('EventReminder', 'event')
    reminders: Relation<EventReminder[]>;

    @OneToMany('NotificationDevice', 'user')
    devices: Relation<NotificationDevice[]>;

    constructor(data: any) {
        if (!data) return;
        this.id = data.id;
        this.username = data.username;
        this.fullname = data.fullname;
        this.email = data.email;
        this.auth = data.auth;
        this.city = data.city;
        this.confirmed = data.confirmed;
        this.country = data.country;
        this.department = data.department;
        this.firstaccess = data.firstaccess;
        this.lastaccess = data.lastaccess;
        this.lang = data.lang;
        this.mailformat = data.mailformat;
        this.profileimageurl = data.profileimageurl;
        this.profileimageurlsmall = data.profileimageurlsmall;
        this.suspended = data.suspended;
        this.theme = data.theme;
        this.timezone = data.timezone;
        this.preferences = data.preferences;
        this.token = data.token;
    }
}

@ObjectType()
export class UserPreference {
    @Field(() => String)
    name: string;

    @Field(() => String)
    value: string;
}
