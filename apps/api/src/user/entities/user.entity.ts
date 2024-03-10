import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
    @Field(() => Int)
    id: number;

    @Field()
    username: string;

    @Field()
    fullname: string;

    @Field()
    email: string;

    @Field({ nullable: true })
    department: string;

    @Field(() => Int, { nullable: true })
    firstaccess: number;

    @Field(() => Int, { nullable: true })
    lastaccess: number;

    @Field({ nullable: true })
    auth: string;

    @Field({ nullable: true })
    suspended: string;

    @Field({ nullable: true })
    confirmed: string;

    @Field({ nullable: true })
    lang: string;

    @Field({ nullable: true })
    theme: string;

    @Field({ nullable: true })
    timezone: string;

    @Field({ nullable: true })
    mailformat: number;

    @Field({ nullable: true })
    city: string;

    @Field({ nullable: true })
    country: string;

    @Field({ nullable: true })
    profileimageurlsmall: string;

    @Field({ nullable: true })
    profileimageurl: string;

    @Field(() => [UserPreference])
    preferences: UserPreference[];

    @Field()
    token: string;

    constructor(data: any) {
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
    @Field()
    name: string;

    @Field()
    value: string;
}
