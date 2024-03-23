import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class QueryArgs {
    @Field(() => Boolean, { defaultValue: false })
    isNew: boolean;
}
