import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CrawlArgs {
    @Field(() => [String], {
        nullable: true,
        defaultValue: ['2023'],
        description:
            'Get all major of that year',
    })
    years?: string[];

}
