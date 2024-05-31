import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ElectiveSubjectsResult {
    @Field(() => String)
    name: string;

    @Field(() => String)
    credits: string;

    @Field(() => [String])
    codes: string[];
}
