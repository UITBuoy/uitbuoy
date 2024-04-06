import { Field, InputType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateGoogleUserInput {
    @Field()
    id: string;

    @Field()
    familyName: string;

    @Field()
    givenName: string;

    @Field()
    email: string;

    @Field()
    name: string;

    @Field()
    photo: string;

    user: User;
}
