import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
    @Field(() => Int, { nullable: true, defaultValue: 5 })
    limit: number;

    @Field(() => Int, { nullable: true, defaultValue: 0 })
    skip: number;
}
