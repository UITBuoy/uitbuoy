import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class QueryArgs {
    @Field(() => Boolean, { nullable: true, defaultValue: false })
    isNew?: boolean;

    @Field(() => Boolean, { nullable: true, defaultValue: false })
    isRecent?: boolean;

    @Field({ nullable: true })
    keyword?: string;
}
