import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class QueryArgs {
    @Field(() => Boolean, {
        nullable: true,
        defaultValue: true,
        description:
            'If true, fetch the new data from Moodle API, else query from the database',
    })
    isNew?: boolean;

    @Field(() => Boolean, {
        nullable: true,
        defaultValue: true,
        description: 'If true, only query for courses in the current semester',
    })
    isRecent?: boolean;

    @Field({ nullable: true, description: 'The keyword to find' })
    keyword?: string;
}
