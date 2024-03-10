import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class AuthEntity extends User {
    @Field()
    token: string;

    @Field()
    access_token: string;

    constructor(data: any) {
        super(data);
        this.token = data.token;
    }
}
