import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class AuthEntity extends User {
    @Field()
    access_token: string;

    @Field({ nullable: true })
    refresh_token?: string;

    @Field(() => Date, { nullable: true })
    accessTokenExpiredDate?: Date;

    @Field(() => Date, { nullable: true })
    refreshTokenExpiredDate?: Date;

    constructor(data: any) {
        super(data);
        this.token = data.token;
    }
}
